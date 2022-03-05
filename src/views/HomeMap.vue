<template>
  <div class="home">
    <GoogleMap
      ref="mapRef"
      api-key="AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU"
      style="width: 100%; height: 100vh;"
      :center="position"
      :zoom="12"
      @click="addNewRestaurant"
      @dragend="mapCenter">
      <Marker
        :options="markerOptions"
        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      />
      <!--
        Check if data is a list of restaurants or a restaurant
        by checking if property restaurantName exists
      -->
      <Marker
        v-if="data.restaurantName"
        :key="data.restaurantName"
        :options="{ position: { lat: data.lat, lng: data.long } }"
      />
      <Marker
        v-else
        v-for="restaurant in restaurants"
        :key="restaurant.name"
        :options="{ position: {
          lat: restaurant.geometry.location.lat(),
          lng: restaurant.geometry.location.lng()
          }
        }"
      />
    </GoogleMap>
    <button class="findInAreaBtn" aria-label="Rechercher dans cette zone">
      Rechercher dans cette zone
    </button>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  toRefs,
  ref,
  watch,
  onMounted,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GoogleMap, Marker } from 'vue3-google-map';
import { useStore } from 'vuex';

export default defineComponent({
  components: { GoogleMap, Marker },
  props: {
    data: { type: Object },
  },
  emits: ['mapRef'],
  setup(props) {
    const mapRef = ref(null);
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { data } = toRefs(props);
    console.log(data);

    store.dispatch('getLocation');
    const position = computed(() => store.state.position);

    // store.dispatch('fetchRestaurants');

    function addNewRestaurant(event) {
      if (route.path === '/') {
        router.push({
          name: 'AddRestaurant',
          params: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          },
        });
      }
    }

    onMounted(() => {
      watch(() => mapRef.value.ready, (isReady) => {
        console.log(mapRef.value);
        if (!isReady) return;
        // store.commit('GET_RESTAURANTS_NEAR', mapRef);
        store.dispatch('getRestaurantsNear', mapRef);
      });
    });

    function mapCenter() {
      console.log(mapRef.value.map.center.lat());
      console.log(mapRef.value.map.center.lng());
    }

    // TODO: Couleur spécifique pour le marqueur de la position utilisateur
    const markerOptions = computed(() => ({
      icon: {
        url: 'https://www.seekpng.com/png/full/18-180376_bluemapicon-blue-google-maps-marker.png',
        scaledSize: { width: 27, height: 43 },
        labelOrigin: { x: 16, y: -10 },
      },
      position: position.value,
      title: 'Just Here',
    }));

    return {
      position,
      markerOptions,
      restaurants: data,
      addNewRestaurant,
      mapCenter,
      mapRef,
    };
  },
});
</script>

<style lang="scss">
.findInAreaBtn {
  position: absolute;
  top : 10px;
  right: 10%;
}
</style>
