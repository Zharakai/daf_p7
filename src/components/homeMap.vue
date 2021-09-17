<template>
  <GoogleMap
    api-key="AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="11"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 44.637748, lng: 3.9164684 };
    const markerOptions = { position: center, label: 'JH', title: 'Just Here' };
    return { center, markerOptions };
  },
  methods: {
    test() {
      console.log(this.$store);
    },
  },
});
</script>
