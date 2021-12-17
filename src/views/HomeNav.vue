<template>
  <div id="nav" class="homeNav">
    <img alt="Just Here logo" src="../assets/logo.png">
    <div class="restaurantsNav">
      <div class="restaurantsFilter">
        <label for="ratingsFilter">Filtre par notes</label>
        <input
          @change="logChange($event, 'min')"
          class="inputMin"
          type="number"
          v-model.number="minRate"
          min="0"
          :max="maxRate"
          list="range"
          step="0.5">
        <input
          @change="logChange($event, 'max')"
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
          v-for="restaurant in restaurants"
          :key="restaurant.restaurantName">
          <router-link :to="{ name: 'Restaurant', params: { id: restaurant.restaurantName }}">
            <div>
              <p>{{ restaurant.restaurantName }}</p>
              <p>{{ restaurant.average }}</p>
              <p>{{ restaurant.address }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import EventBus from '@/EventBus';

export default {
  props: {
    restaurants: { type: Array },
  },
  setup() {
    const minRate = ref(0);
    const maxRate = ref(5);

    const logChange = (event, type) => {
      const data = { type, value: event.target.value };
      EventBus.emit('updateFilter', data);
    };

    return {
      logChange,
      minRate,
      maxRate,
    };
  },
};
</script>
