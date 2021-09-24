import { createStore } from 'vuex';
import restaurants from '../restaurants.json';
// import axios from 'axios';

const currentPosition = {};

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

// Fetch appel API
/*
console.log(restaurants);
fetch('../restaurants.json').then(async (response) => {
  try {
    const data = await response.json();
    console.log('response data?', data);
  } catch (error) {
    console.log('Error happened here!');
    console.error(error);
  }
});
*/
/*
fetch('../src/restaurants.json')
  .then((res) => res.json())
  .then((data) => console.log(data));
*/
/*
axios.get('restaurants.json')
  .then((res) => {
    console.log(res.data);
  });
*/
/*
fetch('../restaurants.json')
  .then((response) => response.json())
  .then((response) => console.log(JSON.stringify(response)))
  .catch((error) => alert(`Erreur : ${error}`));
*/

export default createStore({
  state() {
    return {
      position: currentPosition,
      restaurants,
    };
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
