<template>
  <div class="selectedRestaurant">
    <router-link to="/" class="back" aria-label="Retour" title="Retour"></router-link>
    <div>
        <img :src="`https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${restaurant.geometry.location.lat()},${restaurant.geometry.location.lng()}&heading=151.78&pitch=-0.76&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU`">
        <h1><i class="fas fa-utensils"></i>{{ restaurant.name }}</h1>
        <p>
          <i class="fas fa-star"></i>
          {{ restaurant.rating }}
          <span class="userRatingsTotal">({{ restaurant.user_ratings_total }} avis)</span>
        </p>
        <p><i class="fas fa-map-marker"></i>{{ restaurant.formatted_address }}</p>
        <router-link :to="{
          name: 'RestaurantReview',
          params: { id: $route.params.id }}">
          Rédiger un avis
        </router-link>
        <p v-for="review in restaurant.reviews" :key="review.text">
          <i class="fas fa-star"></i>{{ review.rating}}<br>
          {{ review.text }}
        </p>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue';

export default ({
  props: {
    data: { type: Object },
  },
  setup(props) {
    const { data } = toRefs(props);
    console.log(data);

    return { restaurant: data };
  },
});
</script>

<style lang="scss">
.selectedRestaurant {
  width: 417px;
  overflow-y: scroll;
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
