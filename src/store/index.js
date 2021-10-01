import { createStore } from 'vuex';

const currentPosition = {};
const restaurantsList = [];

function getAddress(lat, lng) {
  currentPosition.lat = lat;
  currentPosition.lng = lng;
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      getAddress(position.coords.latitude, position.coords.longitude);
    },
    (error) => {
      console.log(error.message);
    },
  );
}

getLocation();

fetch('/restaurants.json').then(async (response) => {
  try {
    const restaurants = await response.json();
    restaurants.forEach((restaurant) => {
      restaurantsList.push(restaurant);
    });
  } catch (error) {
    console.log('Error happened here!');
    console.error(error);
  }
});

export default createStore({
  state() {
    return {
      position: currentPosition,
      restaurantsList,
    };
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
