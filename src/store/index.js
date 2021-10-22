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

    async fetchRestaurants({ commit, state }) {
      try {
        const response = await fetch('/restaurants.json');
        const newRestaurants = await response.json();
        newRestaurants.forEach((newRestaurant) => {
          // eslint-disable-next-line max-len
          const restaurantExist = state.restaurantsList.find((restaurant) => restaurant.restaurantName === newRestaurant.restaurantName);
          if (!restaurantExist) {
            commit('ADD_RESTAURANT', newRestaurant);
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
  },

  plugins: [createLogger()],
});
