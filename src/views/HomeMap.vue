<template>
  <div class="home">
    <GoogleMap
      ref="mapRef"
      api-key="AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU"
      style="width: 100%; height: 100vh;"
      :center="position"
      :zoom="13"
      @click="addNewRestaurant">
      <Marker
        :options="markerOptions"
        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      />
      <!--
        Check if data is a list of restaurants or a restaurant
        by checking if property name exists
      -->
      <Marker
        v-if="data.name"
        :key="data.name"
        :options="{
          position: {
            lat: data.geometry.location.lat(),
            lng: data.geometry.location.lng(),
          },
          title: data.name
        }"
      />
      <Marker
        v-else
        v-for="restaurant in restaurants"
        :key="restaurant.name"
        :options="{
          position: {
            lat: restaurant.geometry.location.lat(),
            lng: restaurant.geometry.location.lng()
          },
          title: restaurant.name
        }"
      />
    </GoogleMap>
    <button class="findInAreaBtn" aria-label="Rechercher dans cette zone" @click="mapCenter">
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

    store.dispatch('getLocation');
    const position = computed(() => store.state.position);

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
        if (!isReady) return;
        store.dispatch('getRestaurantsNear', mapRef);
      });
    });

    function mapCenter() {
      store.dispatch('setLocation', {
        lat: mapRef.value.map.center.lat(),
        lng: mapRef.value.map.center.lng(),
      });
    }

    const markerOptions = computed(() => ({
      icon: {
        url: 'https://svg-clipart.com/svg/black/1XsU4IU-blue-marker-black-border-fit-vector.svg',
        scaledSize: { width: 27, height: 43 },
      },
      position: store.state.userPosition,
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
  top: 10px;
  background-color: rgb(255, 255, 255);
  border: none;
  height: 40px;
  padding: 0 17px;
  box-shadow: rgb(0 0 0 / 30%) 0 1px 4px -1px;
  font-size: 14px;
  cursor: pointer;
  font-family: Roboto, Arial, sans-serif;
  &:hover {
    background-color: rgb(235, 235, 235);
  }
}
</style>
