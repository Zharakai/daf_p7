<template>
 <div class="restaurantReview">
   <router-link :to="`/restaurant/${$route.params.id}`" class="back" aria-label="Retour"
   title="Retour">
   </router-link>
   <img :src="`https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${restaurant.lat},${restaurant.long}&heading=151.78&pitch=-0.76&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU`">
   <div class="containerReview">
     <h1>{{ restaurant.restaurantName }}</h1>
     <form action="review" onsubmit="return false">
       <label for="rating">Note</label>
       <input type="number" min="0" max="5">
       <textarea name="" id="" cols="30" rows="10"></textarea>
       <button>Envoyer</button>
     </form>
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
    // emit restaurant added

    return { restaurant: data };
  },
});
</script>

<style lang="scss">
.restaurantReview {
  width: 400px;
  .back {
    display: flex;
  }
  .containerReview {
    padding: 0 5%;
  }
  form {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    textarea {
      resize: vertical;
    }
  }
}
</style>
