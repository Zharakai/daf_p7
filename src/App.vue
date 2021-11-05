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
            v-for="restaurant in restaurantsList"
            :key="restaurant.restaurantName">
            <a href="#" v-on:click="toggle">
              <div v-on:click="showRestaurant">
                <p>{{ restaurant.restaurantName }}</p>
                <p>{{ getAverageRating(restaurant.ratings) }}</p>
                <p>{{ restaurant.address }}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="selectedRestaurant hidden">
        <p class="back" v-on:click="toggle" aria-label="Retour" title="Retour"></p>
        <div>
          <p>img</p>
          <p>restaurantName</p>
          <p>averageRating</p>
          <p>address</p>
          <p>comments</p>
        </div>
      </div>
    </div>
    <router-view/>
  </main>
</template>

<script>
import { useStore } from 'vuex';

function toggle() {
  const selectedRestaurant = document.getElementsByClassName('selectedRestaurant');
  const restaurants = document.getElementsByClassName('restaurantsNav');
  selectedRestaurant[0].classList.toggle('visible');
  restaurants[0].classList.toggle('hidden');
  console.log(restaurants);
}

function showRestaurant(event) {
  console.log(event.target.parentElement);
  console.log(event.target.parentElement.firstChild);
}

export default {
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
      toggle,
      showRestaurant,
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
