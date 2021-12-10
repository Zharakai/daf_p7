<template>
  <main>
    <router-view/>
    <HomeMap/>
  </main>
</template>

<script>
import { ref/* , computed */ } from 'vue';
import { useStore } from 'vuex';
import HomeMap from './views/HomeMap.vue';
// eslint-disable-next-line
import EventBus from '@/EventBus';

export default {
  components: { HomeMap },
  setup() {
    const store = useStore();
    const { restaurantsList } = store.state;
    let minRate;
    let maxRate;
    // let restaurantsFiltered;

    // console.log('coucouGet');
    function getAverageRating(ratings) {
    // Create an array for each restaurant with their ratings
      const flatRatings = ratings.map((rating) => rating.stars);
      // Take each array previously created to return the average with one decimal
      return Math.round((flatRatings.reduce((a, b) => a + b) / ratings.length) * 10) / 10;
    }

    // console.log('coucouFilter');
    const restaurantsFiltered = restaurantsList.filter(({ ratings }) => {
      const avgRating = getAverageRating(ratings);
      console.log(avgRating >= minRate.value);
      console.log(avgRating <= maxRate.value);
      return avgRating >= minRate.value && avgRating <= maxRate.value;
    });

    function test(eventTarget) {
      if (eventTarget.classList.value === 'inputMin') {
        minRate = ref(eventTarget.value);
        // console.log('minRate: ', minRate.value);
        // console.log('restaurantsFiltered: ', restaurantsList);
        restaurantsList.filter(({ ratings }) => {
          console.log('restaurantsFiltered ratings');
          return console.log(ratings);
        });
      } else if (eventTarget.classList.value === 'inputMax') {
        maxRate = ref(eventTarget.value);
        // console.log('maxRate: ', maxRate.value);
        console.log('restaurantsFiltered: ', restaurantsList);
      }
    }

    EventBus.on('logChange', test);

    return {
      restaurantsList,
      restaurantsFiltered,
      test,
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
  padding-top: 30px;
  width: 350px;
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

    select {
      margin: 0 0 0 5px;
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
  width: calc(100vw - 350px);
}
</style>
