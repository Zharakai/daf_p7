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
          @change="doMinTest"
          type="number"
          v-model.number="minRate"
          min="0"
          :max="maxRate"
          list="range">
        <input
          ref="uniqueName"
          class="inputMax"
          @change="doMaxTest"
          type="number"
          v-model.number="maxRate"
          :min="minRate"
          max="5"
          list="range">
        <!--<datalist id="range">
          <option value="0"></option>
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
          <option value="4"></option>
          <option value="5"></option>
        </datalist>
        <vue-range-slider v-model="value" :min="min" :max="max" :enable-cross="enableCross">
        </vue-range-slider>-->
      </div>

      <!--<select name="filter" id="ratingsFilter">
        <option value="allRatings">Toutes les notes</option>
        <option value="2">2</option>
        <option value="2.5">2.5</option>
        <option value="3">3</option>
        <option value="3.5">3.5</option>
        <option value="4">4</option>
        <option value="4.5">4.5</option>
      </select>-->

      <!--<div id="v-model-select" class="demo">
        <select v-model="selected">
          <option disabled value="">Please select one</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
        <span>Selected: {{ selected }}</span>
      </div>-->

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
    const minRate = ref(0);
    const maxRate = ref(5);
    // console.log(VueRangeSlider);

    function getAverageRating(ratings) {
      // Create an array for each restaurant with their ratings
      const flatRatings = ratings.map((rating) => rating.stars);
      // Take each array previously created to return the average with one decimal
      return Math.round((flatRatings.reduce((a, b) => a + b) / ratings.length) * 10) / 10;
    }

    function doMinTest() {
      const minTest = this.minRate;
      console.log(minTest);
      console.log(restaurantsList);
      restaurantsList.forEach((restaurant) => {
        getAverageRating(restaurant.ratings);
      });
    }

    function doMaxTest() {
      const maxTest = this.maxRate;
      console.log(maxTest);
    }

    // Computed filter

    return {
      restaurantsList,
      getAverageRating,
      doMinTest,
      doMaxTest,
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
