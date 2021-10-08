<template>
  <GoogleMap
    api-key="AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU"
    style="width: 100%; height: 100vh;"
    :center="position"
    :zoom="11"
  >
    <Marker :options="{ position }" />
    <Marker
      v-for="restaurant in restaurantsList"
      :key="restaurant.name"
      :options="{
      position: { lat: restaurant.lat, lng: restaurant.long } }"/>
  </GoogleMap>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import { useStore } from 'vuex';

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const store = useStore();

    store.dispatch('getLocation');
    const position = computed(() => store.state.position);

    store.dispatch('fetchRestaurants');
    const restaurantsList = computed(() => store.state.restaurantsList);

    const markerOptions = { position, label: 'JH', title: 'Just Here' };

    return {
      position,
      markerOptions,
      restaurantsList,
    };
  }, // Add mutations/actions getDatas
  mounted() {
  },
  methods: {
  },
  mutations: {
  },
});
</script>
