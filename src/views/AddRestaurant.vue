<template>
  <div class="addRestaurant">
    <router-link to="/" class="back" aria-label="Retour"
    title="Retour">
    </router-link>
    <img :src="`https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${lat},${lng}&heading=151.78&pitch=-0.76&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU`">
    <div class="addRestaurantContainer">
      <h1>Ajouter un restaurant</h1>
      <form action="addRestaurant" onsubmit="return false" @submit.prevent="submitNewRestaurant">
       <label for="name">Nom</label>
       <input type="text" id="name" v-model="name">
       <label for="address">Adresse</label>
       <input type="text" id="address" :value="`${formattedAddress}`" disabled>
       <label for="lat">Latitude</label>
       <input type="text" id="lat" :value="`${lat}`" disabled>
       <label for="lng">Longitude</label>
       <input type="text" id="lng" :value="`${lng}`" disabled>
       <button>Envoyer</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import EventBus from '@/EventBus';

export default ({
  props: {
  },
  setup() {
    const route = useRoute();
    const { lat } = route.params; // ref
    const { lng } = route.params; // ref
    const formattedAddress = ref('');
    const name = ref('');

    async function fetchAddress() {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU`);
        const jsonResponse = await response.json();
        formattedAddress.value = jsonResponse.results[0].formatted_address;
      } catch (error) {
        console.error(error);
      }
    }

    fetchAddress();

    const submitNewRestaurant = () => {
      const restaurantObject = {
        name: name.value,
        formatted_address: formattedAddress.value,
        geometry: {
          location: {
            lat: Number(lat),
            lng: Number(lng),
          },
        },
        reviews: [],
      };
      EventBus.emit('submitNewRestaurant', restaurantObject);
    };

    return {
      name,
      lat,
      lng,
      formattedAddress,
      submitNewRestaurant,
    };
  },
});
</script>

<style lang="scss">
.addRestaurant {
  width: 417px;
  overflow-y: scroll;
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
