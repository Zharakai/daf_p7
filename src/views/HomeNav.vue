<template>
  <div id="nav" class="homeNav">
    <img alt="Just Here logo" src="../assets/logo.png">
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
          <router-link
            @click="getRestaurantName(restaurant.restaurantName)"
            :to="{ name: 'Restaurant', params: { id: restaurant.restaurantName }}">
            <div>
              <p>{{ restaurant.restaurantName }}</p>
              <p>{{ getAverageRating(restaurant.ratings) }}</p>
              <p>{{ restaurant.address }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

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

    function getRestaurantName(name) {
      const restaurantClicked = name;
      store.state.restaurantClicked = restaurantClicked;
      // console.log(restaurantName);
    }

    return {
      restaurantsList,
      getAverageRating,
      getRestaurantName,
      // restaurantName,
    };
  },
};
</script>
