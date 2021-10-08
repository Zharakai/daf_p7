import { createStore, createLogger } from 'vuex';

export default createStore({
  state() {
    return {
      position: { lat: 0, lng: 0 },
      restaurantsList: [],
    };
  },

  mutations: {
    GET_POSITION(state, pos) {
      // eslint-disable-next-line no-param-reassign
      state.position = pos;
    },

    ADD_RESTAURANT(state, newRestaurant) {
      state.restaurantsList.push(newRestaurant);
    },
  },

  actions: {
    getLocation({ commit }) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          commit('GET_POSITION', pos);
        },
        (error) => {
          console.log(error.message);
        },
      );
    },

    fetchRestaurants({ commit }) {
      fetch('/restaurants.json').then(async (response) => {
        try {
          const restaurants = await response.json();
          restaurants.forEach((restaurant) => {
            // find() restaurantsList to check if restaurant exist
            commit('ADD_RESTAURANT', restaurant);
          });
        } catch (error) {
          console.log('Error happened here!');
          console.error(error);
        }
      });
    },
  },

  plugins: [createLogger()],
});
