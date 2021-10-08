import { createStore, createLogger } from 'vuex';

const currentPosition = {}; // mutations + actions
// const restaurantsList = [];

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

export default createStore({
  state() {
    return {
      position: currentPosition,
      restaurantsList: [],
    };
  },
  mutations: {
    ADD_RESTAURANT(state, newRestaurant) {
      state.restaurantsList.push(newRestaurant);
    },
  },
  // action fetch restaurants
  actions: {
    fetchRestaurants({ commit }) {
      fetch('/restaurants.json').then(async (response) => {
        try {
          const restaurants = await response.json();
          restaurants.forEach((restaurant) => {
            // find restaurantsList to check if restaurant exist
            commit('ADD_RESTAURANT', restaurant);
          });
        } catch (error) {
          console.log('Error happened here!');
          console.error(error);
        }
      });
    },
  },
  modules: {
  },
  plugins: [createLogger()],
});
