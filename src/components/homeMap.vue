<template class="googleMapContainer">
  <GoogleMap
    api-key="AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU"
    style="width: 100%; height: 100vh;"
    :center="position"
    :zoom="11"
  >
    <Marker :options="{ position }" />
    <!--<Marker :options="{ position: { lat: 43.739522552490234, lng: 3.935533285140991 } }" />-->
    <Marker :options="{ position }" v-for="(index) in restaurantsList" :key="index"/>
    <!--<Marker :options="{ position: markerTest }" />-->
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import { useStore } from 'vuex';

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const store = useStore();
    const { position } = store.state; // commit ?
    const markerOptions = { position, label: 'JH', title: 'Just Here' };
    const markerTest = { lat: 43.639522552490234, lng: 3.935533285140991 }; // Append new Marker
    const { restaurantsList } = store.state;
    console.log(restaurantsList);
    return { position, markerTest, markerOptions };
  }, // Add mutations/actions getDatas
  methods: {
  },
  mutations: {
    test() {
      return console.log('this.$store');
    },
  },
});
</script>
