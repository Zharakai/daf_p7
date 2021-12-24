<template>
  <div class="selectedRestaurant">
    <router-link to="/" class="back" aria-label="Retour" title="Retour"></router-link>
    <div>
        <img :src="`https://maps.googleapis.com/maps/api/streetview?size=350x175&location=${toRefsSate.lat.value},${toRefsSate.long.value}&heading=151.78&pitch=-0.76&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU`">
        <h1><i class="fas fa-utensils"></i>{{ toRefsSate.restaurantName.value }}</h1>
        <p><i class="fas fa-star"></i>{{ toRefsSate.average.value }}</p>
        <p><i class="fas fa-map-marker"></i>{{ toRefsSate.address.value }}</p>
        <router-link :to="{
          name: 'RestaurantReview',
          params: { id: toRefsSate.restaurantName.value }
          }">
          <button>Rédiger un avis</button>
        </router-link>
        <p v-for="rating in toRefsSate.ratings.value" :key="rating.comment">
          <i class="fas fa-star"></i>{{ rating.stars}}<br>
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

    const toRefsSate = toRefs(state);

    return {
      toRefsSate,
    };
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

    i {
      color: #ff9e16;
      margin: 0 5px 0 0;
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
