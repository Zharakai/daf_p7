<template>
  <div class="selectedRestaurant">
    <router-link to="/" class="back" aria-label="Retour" title="Retour"></router-link>
    <div>
        <img :src="`https://maps.googleapis.com/maps/api/streetview?size=350x175&location=${lat},${long}&heading=151.78&pitch=-0.76&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU`">
        <h1><i class="fas fa-utensils"></i>{{ restaurantName }}</h1>
        <p><i class="fas fa-star"></i>{{ average }}</p>
        <p><i class="fas fa-map-marker"></i>{{ address }}</p>
        <p v-for="rating in ratings" :key="rating.comment">
          <i class="fas fa-star"></i>
          {{ rating.stars}} <br>
          {{ rating.comment }}
        </p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

function getAverageRating(ratings) {
  const flatRatings = ratings.map((rating) => rating.stars);
  return Math.round((flatRatings.reduce((a, b) => a + b) / ratings.length) * 10) / 10;
}

export default ({
  setup() {
    const store = useStore();
    const route = useRoute();

    const state = reactive({
      restaurantName: '',
      address: '',
      ratings: [],
      average: 0,
      lat: '',
      long: '',
    });

    store.dispatch('getRestaurantByName', route.params.id).then((restaurant) => {
      state.restaurantName = restaurant.restaurantName;
      state.address = restaurant.address;
      state.ratings = restaurant.ratings;
      state.lat = restaurant.lat;
      state.long = restaurant.long;
      state.average = getAverageRating(restaurant.ratings);
    });

    return toRefs(state);
  },
});
</script>

<style lang="scss">
.selectedRestaurant {
  width: 350px;
  overflow: auto;
  a {
    text-decoration: none;
    display: flex;
  }
  div {
    text-align: left;
    h1 {
      font-size: 1.375rem
    }
    h1, p {
      padding: 5px;
    }
  }
}
.back {
    width: fit-content;
    color: black;
    &:hover {
      cursor: pointer;
      color: #42b983;
    }
    &::before {
    content: '\1F810';
    font-size: 3rem;
  }
}
</style>
