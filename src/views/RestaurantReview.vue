<template>
 <div class="restaurantReview">
   <router-link :to="`/restaurant/${$route.params.id}`" class="back" aria-label="Retour"
   title="Retour">
   </router-link>
   <img :src="`https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${restaurant.lat},${restaurant.long}&heading=151.78&pitch=-0.76&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU`">
   <div class="containerReview">
     <h1>{{ restaurant.restaurantName }}</h1>
     <form action="review" onsubmit="return false" @submit.prevent="submitReview()">
       <label for="rating">Note</label>
       <input type="number" min="1" max="5" class="stars" v-model="stars">
       <textarea name="" id="" cols="30" rows="10" class="comment" v-model="comment"></textarea>
       <button>Envoyer</button>
     </form>
   </div>
 </div>
</template>

<script>
import { toRefs, ref } from 'vue';
import EventBus from '@/EventBus';

export default ({
  props: {
    data: { type: Object },
  },
  emits: ['submitReview'],
  setup(props) {
    const { data } = toRefs(props);
    const comment = ref('');
    const stars = ref(1);

    const submitReview = () => {
      let rating;
      if (comment.value.length > 0 && typeof stars.value === 'number' && stars.value >= 1 && stars.value <= 5) {
        rating = {
          stars,
          comment,
        };
        EventBus.emit('submitReview', rating);
      } else {
        alert('Merci de remplir les champs');
      }
    };

    return {
      restaurant: data,
      submitReview,
      comment,
      stars,
    };
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
      max-height: 40vh;
    }
  }
}
</style>
