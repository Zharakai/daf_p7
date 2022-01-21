<template>
  <div class="home">
    <GoogleMap
    api-key="AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU"
    style="width: 100%; height: 100vh;"
    :center="position"
    :zoom="11">
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
      :options="{ position: { lat: restaurant.lat, lng: restaurant.long } }"
    />
  </GoogleMap>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import { useStore } from 'vuex';

export default defineComponent({
  components: { GoogleMap, Marker },
  props: {
    data: { type: Object },
  },
  setup(props) {
    const store = useStore();
    const { data } = toRefs(props);

    store.dispatch('getLocation');
    const position = computed(() => store.state.position);

    store.dispatch('fetchRestaurants');

    // Test emit move map
    /*
    function test() {
      console.log(position);
    }
    <!-- @mouseup="test" -->
    */

    // TODO: Couleur spécifique pour le marqueur de la position utilisateur
    const markerOptions = computed(() => ({ position: position.value, label: 'JH', title: 'Just Here' }));

    return {
      position,
      markerOptions,
      restaurants: data,
      // test,
    };
  },
});
</script>
