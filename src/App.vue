<template>
  <main>
    <div id="nav">
      <div class="navMenu">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <div class="restaurantsNav">
        <label for="ratingsFilter">Filtre par notes</label>
        <select name="filter" id="ratingsFilter">
          <option value="allRatings">Toutes les notes</option>
          <option value="2">2</option>
          <option value="2.5">2.5</option>
          <option value="3">3</option>
          <option value="3.5">3.5</option>
          <option value="4">4</option>
          <option value="4.5">4.5</option>
        </select>
        <ul>
          <li
            v-for="(restaurant, index) in restaurantsList"
            :key="restaurant.restaurantName">
            <a href="#" v-on:click="toggle">
              <div v-on:click="showRestaurant">
                <p>{{ restaurant.restaurantName }}</p>
                <p>{{ averageRating[index] }}</p>
                <p>{{ restaurant.address }}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="selectedRestaurant hidden">
        <p class="back" v-on:click="toggle" aria-label="Retour" title="Retour"></p>
      </div>
    </div>
    <router-view/>
  </main>
</template>

<script>
import { useStore } from 'vuex';
// import { computed } from 'vue';

/*
function getAverageRating() {
  const store = useStore();
  const { restaurantsList } = store.state;
  const ratings = [];
  const averageRating = [];
  restaurantsList.forEach((restaurant) => {
    // eslint-disable-next-line no-param-reassign
    restaurant.average = 0;
    console.log(restaurant);
    const restaurantRatings = [];
    // console.log(restaurant.ratings.length);
    restaurant.ratings.forEach((rating) => {
    // console.log(rating);
    // console.log('Ratings ', i, ' -> ', rating.stars);
      restaurantRatings.push(rating.stars);
    // ratings.push(averageRating);
    });

    ratings.push(restaurantRatings);
  });
  // console.log(ratings);
  // console.log(ratings.length);
  ratings.forEach((rating) => {
    averageRating.push(Math.round((rating.reduce((a, b) => a + b) / rating.length) * 10) / 10);
  });
  console.log(averageRating);
}
*/

function toggle() {
  const selectedRestaurant = document.getElementsByClassName('selectedRestaurant');
  const restaurants = document.getElementsByClassName('restaurantsNav');
  selectedRestaurant[0].classList.toggle('visible');
  restaurants[0].classList.toggle('hidden');
  console.log(restaurants);
}

function showRestaurant(event) {
  console.log(event.target.parentElement);
}

export default {
  setup() {
    const store = useStore();
    console.log(store);
    const { restaurantsList } = store.state;
    const averageRating = [];

    // getAverageRating();

    // store.dispatch('getAverageRating');
    // const average = computed(() => store.state.restaurantsList);
    // console.log(average);
    // console.log(restaurantsList);

    function getAverageRating() {
      const ratings = [];
      restaurantsList.forEach((restaurant) => {
        // eslint-disable-next-line no-param-reassign
        restaurant.average = 0;
        const restaurantRatings = [];
        // console.log(restaurant.ratings.length);
        restaurant.ratings.forEach((rating) => {
          // console.log(rating);
          // console.log('Ratings ', i, ' -> ', rating.stars);
          restaurantRatings.push(rating.stars);
          // ratings.push(averageRating);
        });

        ratings.push(restaurantRatings);
      });
      // console.log(ratings);
      // console.log(ratings.length);
      ratings.forEach((rating) => {
        averageRating.push(Math.round((rating.reduce((a, b) => a + b) / rating.length) * 10) / 10);
      });
      // console.log(averageRating);
    }

    /*
    restaurantsList.forEach((restaurant) => {
      // eslint-disable-next-line no-param-reassign
      restaurant.average = 0;
    });
    */

    getAverageRating();
    console.log('yepah', restaurantsList);
    // console.log(averageRating);
    // console.log(store.state.restaurantsList);

    /* function test() {
      const element = document.getElementsByClassName('selectedRestaurant');
      element.classList.toggle('visible');
    } */

    /*
    restaurantsList.forEach((restaurant, i) => {
      // eslint-disable-next-line no-param-reassign
      // restaurant.averageArray = [];
      const average = 'test';
      restaurant.ratings.forEach((rating) => {
        // restaurant.averageArray.push(rating.stars);
        // const average
        console.log(average, i);
        console.log(rating.stars);
      });
    });
    */

    // console.log(restaurantsList);

    // const averageRating = getAverageRating();

    return {
      restaurantsList,
      averageRating,
      toggle,
      showRestaurant,
    };
  },
  mounted() {
    // console.log(this.$store.state.restaurantsList);
  },
  mutations() {
    // console.log(this.$store.state);
  },
  methods: {
    // Ratings [] => moyenne
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

  .back {
    width: fit-content;

    &:hover {
      cursor: pointer;
      color: #42b983;
    }

    &::before {
    content: '\1F810';
    font-size: 3rem;
  }
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
