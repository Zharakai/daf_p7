<template>
  <div class="selectedRestaurant">
    <router-link to="/" class="back" aria-label="Retour" title="Retour"></router-link>
    <div>
        <img :src="`https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${restaurant.lat},${restaurant.long}&heading=151.78&pitch=-0.76&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU`">
        <h1><i class="fas fa-utensils"></i>{{ restaurant.restaurantName }}</h1>
        <p><i class="fas fa-star"></i>{{ restaurant.average }}</p>
        <p><i class="fas fa-map-marker"></i>{{ restaurant.address }}</p>
        <router-link :to="{
          name: 'RestaurantReview',
          params: { id: $route.params.id }
          }">
          Rédiger un avis
        </router-link>
        <p v-for="rating in restaurant.ratings" :key="rating.comment">
          <i class="fas fa-star"></i>{{ rating.stars}}<br>
          {{ rating.comment }}
        </p>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue';
/*
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
*/

/*
function getAverageRating(ratings) {
  const flatRatings = ratings.map((rating) => rating.stars);
  return Math.round((flatRatings.reduce((a, b) => a + b) / ratings.length) * 10) / 10;
}
*/

export default ({
  // props
  props: {
    data: { type: Object },
  },
  setup(props) {
    const { data } = toRefs(props);
    // const store = useStore();
    // const route = useRoute();

    /*
    const state = reactive({
      restaurantName: '',
      address: '',
      ratings: [],
      average: 0,
      lat: '',
      long: '',
    });
    */

    /*
    store.dispatch('getRestaurantByName', route.params.id).then((restaurant) => {
      state.restaurantName = restaurant.restaurantName;
      state.address = restaurant.address;
      state.ratings = restaurant.ratings;
      state.lat = restaurant.lat;
      state.long = restaurant.long;
      state.average = getAverageRating(restaurant.ratings);
    });
    */

    // const toRefsSate = toRefs(state);

    return { restaurant: data };
    // toRefsSate, // state ?
  },
});
</script>

<style lang="scss">
.selectedRestaurant {
  width: 400px;
  overflow: auto;
  a {
    text-decoration: none;
    display: flex;
    justify-content: center;
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

    a {
      border: solid 1px;
      margin: 0 20%;
      padding: 1%;
      color: black;
      text-decoration: none;
      border-radius: 8px;
      &:hover {
        color: #42b983;
      }
    }
  }
}
.back {
  width: 20px;
  height: 20px;
  border-width: 4px 4px 0 0;
  border-style: solid;
  margin: 10px;
  position: absolute;
  display: inline-block;
  vertical-align: middle;
  color: rgb(0, 0, 0);
  box-sizing: border-box;
  transform: rotate(225deg);
  &::after, &::before {
    content: "";
    box-sizing: border-box;
  }
  &::before {
    right: 0;
    top: -3px;
    position: absolute;
    height: 4px;
    box-shadow: inset 0 0 0 32px;
    transform: rotate(-45deg);
    width: 23px;
    transform-origin: right top;
  }
  &:hover {
    color: #42b983;
  }
}
</style>
