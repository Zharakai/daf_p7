<template>
 <div class="restaurantReview">
   <router-link :to="`/restaurant/${$route.params.id}`" class="back" aria-label="Retour"
   title="Retour">
   </router-link>
   <img src="https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${toRefsSate.lat.value},${toRefsSate.long.value}&heading=151.78&pitch=-0.76&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU">
   <div>
     <h1>{{ $route.params.id }}</h1>
     <form action="review">
       <label for="rating">Note</label>
       <input type="number" min="0" max="5">
     </form>
   </div>
 </div>
</template>

<script>
export default {
  setup() {
    // emit restaurant added
  },
};
</script>

<style lang="scss">
.restaurantReview {
  width: 400px;
  .back {
    display: flex;
  }
}
</style>
