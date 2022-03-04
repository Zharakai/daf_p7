<template>
  <div id="nav" class="homeNav">
    <div class="headerLogo">
      <svg viewBox="0 0 225 200">
        <path
          id="curve"
          d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264"
          style="fill: transparent;">
        </path>
        <text x="25" fill="white">
          <textPath xlink:href="#curve">
            Just Here
          </textPath>
        </text>
      </svg>
      <img alt="Just Here logo" src="../assets/logo.png">
    </div>
    <div class="restaurantsNav">
      <div class="restaurantsFilter">
        <label for="ratingsFilter"><i class="fas fa-star"></i>Notes</label>
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
          :key="restaurant.name">
          <router-link :to="{ name: 'Restaurant', params: { id: restaurant.name }}">
            <div>
              <p><i class="fas fa-utensils"></i>{{ restaurant.name }}</p>
              <p>
                <i class="fas fa-star"></i>
                {{ restaurant.rating }}
                <span class="userRatingsTotal">({{ restaurant.user_ratings_total }} avis)</span>
              </p>
              <p><i class="fas fa-map-marker"></i>{{ restaurant.formatted_address }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from 'vue';
import EventBus from '@/EventBus';

export default {
  props: {
    data: { type: Object },
  },
  setup(props) {
    const minRate = ref(0);
    const maxRate = ref(5);
    const { data } = toRefs(props);

    const logChange = (event, type) => {
      const eventData = { type, value: event.target.value };
      EventBus.emit('updateFilter', eventData);
    };

    return {
      restaurants: data,
      logChange,
      minRate,
      maxRate,
    };
  },
};
</script>

<style lang="scss">
.homeNav {
  .headerLogo {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  background-color: #ff9e16;
  max-height: 100px;
  font-family: 'Luckiest Guy', cursive;
  font-size: 18px;
  }
  .restaurantsFilter {
    display: flex;
    align-items: center;
    justify-content: center;
    label {
      margin: 0 1% 0 0;
    }
    input {
    width: 40px;
    }
    .inputMin {
      margin: 0 1% 0 0;
    }
  }
  .userRatingsTotal {
    color: #6f6f6f;
    font-size: 0.8em;
  }
}
</style>
