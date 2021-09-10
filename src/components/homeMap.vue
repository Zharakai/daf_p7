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

// let latitude;
// let longitude;
const currentPosition = {};

function getAddress(lat, lng) {
  // console.log(centerTwo);
  currentPosition.lat = lat;
  currentPosition.lng = lng;
  // return centerTwo;
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // console.log(position.coords.latitude);
      // console.log(position.coords.longitude);
      getAddress(position.coords.latitude, position.coords.longitude);
      console.log(currentPosition);
      console.log(typeof currentPosition.lat);
      console.log(typeof currentPosition.lng);
    },
    (error) => {
      console.log(error.message);
    },
  );
}
// console.log(getLocation());
// console.log(getAddress());
// console.log('coucou');

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    // const center = { lat: 44.637747999999995, lng: 3.9164684 };
    // let center = {};
    // center = getLocation();
    getLocation();
    console.log(currentPosition);
    console.log(currentPosition.lat);
    console.log(currentPosition.lng);
    const center = { lat: currentPosition.lat, lng: currentPosition.lng };

    const markerOptions = { position: center, label: 'JH', title: 'Just Here' };
    // console.log(center);

    return { center, markerOptions };
  },
});
</script>
