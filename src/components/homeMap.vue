<template>
  <GoogleMap
    api-key="AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU"
    style="width: 100%; height: 100vh;"
    :center="position"
    :zoom="11"
  >
    <Marker :options="{ position }" />
    <!--<Marker :options="{ position: { lat: 43.739522552490234, lng: 3.935533285140991 } }" />-->
    <!--<Marker :options="{ position }" v-for="(index) in restaurantsList" :key="index"/>-->
    <Marker :options="{ position: markerTest }" />
    <!--<Marker :options="{ position: markerTest2 }" />-->
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';
import { useStore } from 'vuex';

// const test = 'coucouTest';

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const store = useStore();
    const { position } = store.state; // commit ?
    const markerOptions = { position, label: 'JH', title: 'Just Here' };
    const markerTest = { lat: 43.639522552490234, lng: 3.935533285140991 }; // Append new Marker
    // const markerTest2 = { lat: 43.639522552490234, lng: 3.945533285140991 };
    const { restaurantsList } = store.state;
    console.log(restaurantsList);
    return {
      position,
      markerTest,
      markerOptions,
    };
  }, // Add mutations/actions getDatas
  mounted() {
    console.log(this.$store.state.restaurantsList);
    /*
    console.log(this.$store.state.restaurantsList[0].lat);
    console.log(this.$store.state.restaurantsList[0].long);
    const markerTest2 = {
      lat: this.$store.state.restaurantsList[4].lat,
      lng: this.$store.state.restaurantsList[4].long,
    };
    */
    // console.log(this.$el);
    // console.log(test);
    // return { markerTest2 };
  },
  methods: {
  },
  /*
  mutations: {
    test() {
      return console.log('this.$store');
    },
  },
  */
});
</script>
