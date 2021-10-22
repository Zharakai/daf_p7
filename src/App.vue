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
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <ul>
          <li
            v-for="restaurant in restaurantsList"
            :key="restaurant.restaurantName">
            <a href="#">
              <div>
                <p>{{ restaurant.restaurantName }}</p>
                <!-- eslint-disable-next-line max-len -->
                <!--<p v-for="(sub, index) in restaurant" :key="index">{{ sub.ratings[index] }}</p>-->
                <!--<p>{{ restaurant.ratings }}</p>-->
                <p>{{ averageRating }}</p>
                <p>{{ restaurant.address }}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <router-view/>
  </main>
</template>

<script>
import { useStore } from 'vuex';

/*
function getAverageRating() {
  const store = useStore();
  const { restaurantsList } = store.state;
  console.log(restaurantsList[0].ratings[0].stars);
}
*/

export default {
  setup() {
    const store = useStore();
    const { restaurantsList } = store.state;

    // getAverageRating();

    function getAverageRating() {
      const ratings = [];
      restaurantsList.forEach((restaurant) => {
        const restaurantRatings = [];
        // console.log(restaurant.ratings.length);
        restaurant.ratings.forEach((rating) => {
          // console.log(rating);
          // console.log('Ratings ', i, ' -> ', rating.stars);
          restaurantRatings.push(rating.stars);
          // ratings.push(averageRating);
          /*
          if (i === i - 1) {
            console.log(rating.stars);
          }
          */
        });

        ratings.push(restaurantRatings);
      });
      // console.log(ratings);
      // console.log(ratings.length);
      ratings.forEach((rating) => {
        console.log(rating.reduce((a, b) => a + b) / rating.length);
      });
    }

    console.log('yep');

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

    const averageRating = getAverageRating();

    return { restaurantsList, averageRating };
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
}

main {
  display: flex;
  height: 100%;
}

.home {
  width: calc(100vw - 350px);
}
</style>
