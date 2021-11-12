<template>
  <main>
    <router-view/>
    <Home/>
  </main>
</template>

<script>
import { useStore } from 'vuex';
import Home from './views/Home.vue';

/*
function toggle() {
  const selectedRestaurant = document.getElementsByClassName('selectedRestaurant');
  const restaurants = document.getElementsByClassName('restaurantsNav');
  selectedRestaurant[0].classList.toggle('visible');
  restaurants[0].classList.toggle('hidden');
  console.log('clickOnLink');
}

function showRestaurant(event) {
  console.log(event.target.parentElement);
  // console.log(event.target.parentElement.firstChild);
}
*/

export default {
  components: { Home },
  setup() {
    const store = useStore();
    const { restaurantsList } = store.state;

    function getAverageRating(ratings) {
      // Create an array for each restaurant with their ratings
      const flatRatings = ratings.map((rating) => rating.stars);
      // Take each array previously created to return the average with one decimal
      return Math.round((flatRatings.reduce((a, b) => a + b) / ratings.length) * 10) / 10;
    }

    return {
      restaurantsList,
      getAverageRating,
      // toggle,
      // showRestaurant,
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
