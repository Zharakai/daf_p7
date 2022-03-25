<template>
  <main>
    <router-view :data="data" />
    <HomeMap :data="data" />
  </main>
</template>

<script>
import {
  ref,
  computed,
  watch,
  reactive,
} from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import EventBus from '@/EventBus';
import HomeMap from './views/HomeMap.vue';

const minRate = ref(0);
const maxRate = ref(5);

/**
 * @function updateMinMax Is called when the user changes the min or max rate.
 * It updates minRate and maxRate.
 *
 * @param {object} settings - Details of update.
 * @param {('min'|'max')} settings.type - Type of update.
 * @param {number} settings.value - New value.
 *
 * @returns {void}
 */
function updateMinMax({ type, value }) {
  if (type === 'min') {
    minRate.value = value;
    return;
  }
  maxRate.value = value;
}

export default {
  components: { HomeMap },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    let restaurantsFiltered;

    const restaurant = reactive({
      name: '',
      formatted_address: '',
      reviews: [],
      rating: 0,
      geometry: {},
      user_ratings_total: 0,
    });

    /**
     * @function refreshData Updates the data that is being displayed in the HomeMap component.
     * If there is no id, we get all restaurants
     * else if there is an id, we check a particular restaurant
     *
     * @param {string} id - Name of the restaurant.
     */
    function refreshData(id) {
      const restaurantsList = computed(() => store.state.restaurantsList);

      if (!id) {
        // eslint-disable-next-line arrow-body-style
        restaurantsFiltered = computed(() => restaurantsList.value.filter(({ rating }) => {
          return rating >= minRate.value && rating <= maxRate.value;
        }));

        EventBus.on('updateFilter', updateMinMax);
      } else {
        const matchingRestaurant = restaurantsList.value.find(
          ({ name }) => name === id,
        );
        restaurant.name = matchingRestaurant.name;
        restaurant.formatted_address = matchingRestaurant.formatted_address;
        restaurant.reviews = matchingRestaurant.reviews;
        restaurant.geometry = matchingRestaurant.geometry;
        restaurant.rating = matchingRestaurant.rating;
        restaurant.user_ratings_total = matchingRestaurant.user_ratings_total;
      }
    }

    const data = computed(() => {
      if (route.params.id) {
        return restaurant;
      }
      return restaurantsFiltered.value;
    });

    refreshData(route.params.id);

    watch(() => route.params.id, () => {
      refreshData(route.params.id);
    });

    /**
     * @function addNewRating Adding a new rating to the restaurant.
     *
     * @param {number} rating - Rating of the restaurant.
     */
    function addNewRating(rating) {
      const currentRestaurant = data.value;

      const object = {
        currentRestaurant,
        rating,
      };

      store.commit('ADD_RATING', object);
      refreshData(route.params.id);
      router.push({ name: 'Restaurant', params: { id: route.params.id } });
    }

    EventBus.on('submitReview', addNewRating);

    /**
     * @function addNewRestaurant Adding a new restaurant to the list of restaurants.
     *
     * @param {object} restaurantObject - Informations of the restaurant.
     */
    function addNewRestaurant(restaurantObject) {
      store.dispatch('addRestaurant', restaurantObject);
      router.push({ name: 'Home' });
    }

    EventBus.on('submitNewRestaurant', addNewRestaurant);

    return {
      data,
    };
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#nav {
  width: 417px;
  overflow-y: scroll;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;

    &:hover {
        background: #9ea93f1f
      }

    a {
      text-decoration: none;
      font-weight: normal;

      div {
        padding: 5px;
      }
    }

    p {
      text-align: left;
    }
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .restaurantsNav {
    margin: 16px 0 0 ;
    font-family: Roboto, sans-serif;

    select {
      margin: 0 0 0 5px;
    }

    ul {
      i {
        margin: 0 5px 0 0;
        color: #ff9e16;
      }
    }
  }

  .hidden {
    display: none;
  }

  .visible {
    display: block;
  }
}

main {
  display: flex;
  height: 100%;
}

.home {
  width: calc(100vw - 417px);
}
</style>
