<template>
  <div class="addRestaurant">
    <router-link to="/" class="back" aria-label="Retour"
    title="Retour">
    </router-link>
    <img :src="`https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${lat},${lng}&heading=151.78&pitch=-0.76&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU`">
    <div class="addRestaurantContainer">
      <h1>Ajouter un restaurant</h1>
      <form action="addRestaurant" onsubmit="return false" @submit.prevent="">
       <label for="name">Nom</label>
       <input type="text" id="name">
       <button>Envoyer</button>
      </form>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default ({
  props: {
  },
  setup() {
    const route = useRoute();
    const { lat } = route.params;
    const { lng } = route.params;
    // console.log(route.params);
    async function fetchAddress() {
      try {
        // "formatted_address" : "57 Imp. Jacquard, 34170 Castelnau-le-Lez, France",
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU`);
        const test = await response.json();
        console.log(test);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAddress();
    // console.log(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU`);

    return {
      lat,
      lng,
    };
  },
});
</script>

<style lang="scss">
.addRestaurant {
  width: 400px;
  .back {
    display: flex;
  }
  .addRestaurantContainer {
    padding: 0 5%;
  }
  form {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }
}
</style>
