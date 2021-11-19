<template>
  <div class="selectedRestaurant">
    <router-link to="/" class="back" aria-label="Retour" title="Retour"></router-link>
    <div>
        <img :src="`https://maps.googleapis.com/maps/api/streetview?size=350x175&location=${lat},${long}&heading=151.78&pitch=-0.76&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU`">
        <h1>{{ restaurantName }}</h1>
        <p>averageRating</p>
        <p>{{ address }}</p>
        <p v-for="rating in ratings" :key="rating.comment">
          {{ rating.stars}}/5 <br>
          {{ rating.comment }}
        </p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default ({
  setup() {
    const store = useStore();
    const route = useRoute();

    const state = reactive({
      restaurantName: '',
      address: '',
      ratings: [],
      lat: '',
      long: '',
    });

    store.dispatch('getRestaurantByName', route.params.id).then((restaurant) => {
      state.restaurantName = restaurant.restaurantName;
      state.address = restaurant.address;
      state.ratings = restaurant.ratings;
      state.lat = restaurant.lat;
      state.long = restaurant.long;
    });

    return toRefs(state);
  },
});
</script>

<style lang="scss">
.selectedRestaurant {
  padding-top: 30px;
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
