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
       <input type="number" min="1" max="5" class="stars">
       <textarea name="" id="" cols="30" rows="10" class="comment"></textarea>
       <button>Envoyer</button>
     </form>
   </div>
 </div>
</template>

<script>
import { toRefs } from 'vue';
import EventBus from '@/EventBus';

export default ({
  props: {
    data: { type: Object },
  },
  emits: ['submitReview'],
  setup(props) {
    const { data } = toRefs(props);
    // let redirectAfterValidation; @click="$router.push(`/restaurant/${$route.params.id}`)"
    // emit restaurant added

    const submitReview = () => {
      const comment = document.getElementsByClassName('comment')[0].value;
      const stars = Number(document.getElementsByClassName('stars')[0].value);
      let rating;
      if (comment.length > 0 && typeof stars === 'number' && stars >= 1 && stars <= 5) {
        rating = {
          stars,
          comment,
        };
        EventBus.emit('submitReview', rating);
        // redirectAfterValidation
      } else {
        alert('Merci de remplir les champs');
      }
    };

    return {
      restaurant: data,
      submitReview,
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
  .empty {
    border: crimson solid 1px;
  }
}
</style>
