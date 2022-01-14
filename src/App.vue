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
import { useRoute } from 'vue-router';
import HomeMap from './views/HomeMap.vue';
import EventBus from '@/EventBus';

export default {
  components: { HomeMap },
  setup() {
    const route = useRoute();
    const store = useStore();
    const minRate = ref(0);
    const maxRate = ref(5);
    let restaurantsFiltered;

    const restaurant = reactive({
      restaurantName: '',
      address: '',
      ratings: [],
      average: 0,
      lat: '',
      long: '',
    });

    function updateMinMax({ type, value }) {
      if (type === 'min') {
        minRate.value = value;
        return;
      }
      maxRate.value = value;
    }

    function refreshData(id) {
      if (!id) {
        const restaurantsList = computed(() => store.state.restaurantsList);

        // eslint-disable-next-line arrow-body-style
        restaurantsFiltered = computed(() => restaurantsList.value.filter(({ average }) => {
          return average >= minRate.value && average <= maxRate.value;
        }));

        EventBus.on('updateFilter', updateMinMax);
      } else {
        store.dispatch('getRestaurantByName', id).then((matchingRestaurant) => {
          restaurant.restaurantName = matchingRestaurant.restaurantName;
          restaurant.address = matchingRestaurant.address;
          restaurant.ratings = matchingRestaurant.ratings;
          restaurant.lat = matchingRestaurant.lat;
          restaurant.long = matchingRestaurant.long;
          restaurant.average = matchingRestaurant.average;
        });
      }
    }

    const data = computed(() => {
      if (route.params.id) {
        return restaurant;
      }
      return restaurantsFiltered;
    });
    refreshData(route.params.id);

    watch(() => route.params.id, () => {
      refreshData(route.params.id);
    });

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
  width: 400px;
  overflow: auto;
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
  .restaurantsNav {
    margin: 16px 0 0 0;
    font-family: 'Roboto', sans-serif;
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
  width: calc(100vw - 400px);
}
</style>
