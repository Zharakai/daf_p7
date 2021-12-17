<template>
  <div class="home">
    <GoogleMap
    @mouseup="test"
    api-key="AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU"
    style="width: 100%; height: 100vh;"
    :center="position"
    :zoom="11">
    <Marker
      :options="markerOptions"
      icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"/>
    <Marker
      v-for="restaurant in restaurants"
      :key="restaurant.name"
      :options="{ position: { lat: restaurant.lat, lng: restaurant.long } }"
    />
  </GoogleMap>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import { useStore } from 'vuex';

export default defineComponent({
  components: { GoogleMap, Marker },
  props: { restaurants: { type: Array } },
  setup() {
    const store = useStore();

    store.dispatch('getLocation');
    const position = computed(() => store.state.position);

    store.dispatch('fetchRestaurants'); // Props

    // Test emit move map
    function test() {
      console.log(GoogleMap.props.center[1]);
    }

    // TODO: Couleur spécifique pour le marqueur de la position utilisateur
    const markerOptions = computed(() => ({ position: position.value, label: 'JH', title: 'Just Here' }));

    return {
      position,
      markerOptions,
      test,
    };
  },
});
</script>
