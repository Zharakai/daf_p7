<template>
  <GoogleMap
    api-key="AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU"
    style="width: 100%; height: 100vh;"
    :center="position"
    :zoom="11"
  >
    <Marker :options="{ position }" />
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
    const { position } = store.state;
    const markerOptions = { position, label: 'JH', title: 'Just Here' };
    return { position, markerOptions };
  },
  methods: {
  },
});
</script>
