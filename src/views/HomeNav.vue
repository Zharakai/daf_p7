// TODO : - Filtre de tri par note
<template>
  <div id="nav" class="homeNav">
    <img alt="Just Here logo" src="../assets/logo.png">
    <div class="restaurantsNav">
      <div class="restaurantsFilter">
        <label for="ratingsFilter">Filtre par notes</label>
        <!--<input type="range" v-model.number="minRate" min="0" :max="maxRate" list="range">
        <input type="range" v-model.number="maxRate" :min="minRate" max="5" list="range">-->
        <input
          class="inputMin"
          @change="doTest"
          type="number"
          v-model.number="minRate"
          min="0"
          :max="maxRate"
          list="range"
          step="0.5">
        <input
          ref="uniqueName"
          class="inputMax"
          @change="doTest"
          type="number"
          v-model.number="maxRate"
          :min="minRate"
          max="5"
          list="range"
          step="0.5">
        <!--<datalist id="range">
          <option value="0"></option>
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
        </datalist>-->
      </div>

      <ul>
        <li
          v-for="restaurant in restaurantsList"
          :key="restaurant.restaurantName">
          <router-link :to="{ name: 'Restaurant', params: { id: restaurant.restaurantName }}">
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
import { ref } from 'vue';
// import VueRangeSlider from 'vue-range-component';

export default {
  setup() {
    const store = useStore();
    const { restaurantsList } = store.state;
    let restaurantsFiltered;
    const minRate = ref(0);
    const maxRate = ref(5);
    // console.log(VueRangeSlider);

    function getAverageRating(ratings) {
      // Create an array for each restaurant with their ratings
      const flatRatings = ratings.map((rating) => rating.stars);
      // Take each array previously created to return the average with one decimal
      return Math.round((flatRatings.reduce((a, b) => a + b) / ratings.length) * 10) / 10;
    }

    function doTest() {
      const minTest = this.minRate;
      const maxTest = this.maxRate;
      restaurantsFiltered = [];
      // console.log(minTest, maxTest);
      restaurantsList.forEach((restaurant) => {
        if (getAverageRating(restaurant.ratings) >= minTest
        && getAverageRating(restaurant.ratings) <= maxTest) {
          // console.log(restaurant);
          restaurantsFiltered.push(restaurant);
        }
      });
      console.log(restaurantsFiltered);
    }

    // Computed filter

    return {
      restaurantsList,
      getAverageRating,
      doTest,
      minRate,
      maxRate,
    };
  },
  /*
  components: {
    VueRangeSlider,
  },
  */
};
</script>
