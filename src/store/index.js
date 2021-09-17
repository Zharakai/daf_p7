import { createStore } from 'vuex';

const currentPosition = {};

function getAddress(lat, lng) {
  currentPosition.lat = lat;
  currentPosition.lng = lng;
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      getAddress(position.coords.latitude, position.coords.longitude);
      console.log(currentPosition);
    },
    (error) => {
      console.log(error.message);
    },
  );
}

getLocation();

export default createStore({
  state() {
    return {
      position: currentPosition,
    };
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
