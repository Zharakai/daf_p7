<template>
 <div class="restaurantReview">
   <router-link :to="`/restaurant/${$route.params.id}`" class="back" aria-label="Retour"
   title="Retour">
   </router-link>
   <img :src="`https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${restaurant.geometry.location.lat()},${restaurant.geometry.location.lng()}&heading=151.78&pitch=-0.76&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU`">
   <div class="containerReview">
     <h1>{{ restaurant.name }}</h1>
     <form action="review" onsubmit="return false" @submit.prevent="submitReview()">
       <label for="rating">Note</label>
       <input type="number" min="1" max="5" class="stars" v-model="rating">
       <textarea name="" id="" cols="30" rows="10" class="comment" v-model="text"></textarea>
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
    const text = ref('');
    const rating = ref(1);

    const submitReview = () => {
      let review;
      if (text.value.length > 0 && typeof rating.value === 'number' && rating.value >= 1 && rating.value <= 5) {
        review = {
          rating,
          text,
        };
        console.log(data);
        data.value.user_ratings_total += 1;
        EventBus.emit('submitReview', review);
      } else {
        alert('Merci de remplir les champs');
      }
    };

    return {
      restaurant: data,
      submitReview,
      text,
      rating,
    };
  },
});
</script>

<style lang="scss">
.restaurantReview {
  width: 417px;
  overflow-y: scroll;
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
