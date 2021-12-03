// TODO: - Filtre de tri par note
<template>
  <div id="nav" class="homeNav">
    <img alt="Just Here logo" src="../assets/logo.png">
    <div class="restaurantsNav">
      <div class="restaurantsFilter">
        <label for="ratingsFilter">Filtre par notes</label>
        <input
          @change='$emit("customChange", $event.target.value)'
          class="inputMin"
          type="number"
          v-model.number="minRate"
          min="0"
          :max="maxRate"
          list="range"
          step="0.5">
        <input
          @change='$emit("customChange", $event.target.value)'
          ref="uniqueName"
          class="inputMax"
          type="number"
          v-model.number="maxRate"
          :min="minRate"
          max="5"
          list="range"
          step="0.5">
      </div>
      <ul>
        <li
          v-for="restaurant in restaurantsFiltered"
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
import { ref, computed, emit } from 'vue';

export default {
  setup() {
    const store = useStore();
    const { restaurantsList } = store.state;
    const minRate = ref(0);
    const maxRate = ref(5);

    const customChange = (event) => {
      emit('customChange', event.target.value);
    };

    /*
    function test() {
      console.log('test', minRate.value, maxRate.value);
      emit('test', 'someValueTest');
    }
    */

    function getAverageRating(ratings) {
      // Create an array for each restaurant with their ratings
      const flatRatings = ratings.map((rating) => rating.stars);
      // Take each array previously created to return the average with one decimal
      return Math.round((flatRatings.reduce((a, b) => a + b) / ratings.length) * 10) / 10;
    }

    // Test emit min/max
    // TODO: Move to App.vue
    const restaurantsFiltered = computed(() => restaurantsList.filter(({ ratings }) => {
      const avgRating = getAverageRating(ratings);
      return avgRating >= minRate.value && avgRating <= maxRate.value;
    }));

    return {
      restaurantsList,
      getAverageRating,
      customChange,
      restaurantsFiltered,
      minRate,
      maxRate,
    };
  },
};
</script>
