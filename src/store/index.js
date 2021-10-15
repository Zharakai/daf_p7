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

    fetchRestaurants({ commit, state }) {
      // then to await (1 try catch)
      fetch('/restaurants.json').then(async (response) => {
        try {
          const newRestaurants = await response.json();
          newRestaurants.forEach((newRestaurant) => {
            // eslint-disable-next-line max-len
            const restaurantExist = state.restaurantsList.find((restaurant) => restaurant.restaurantName === newRestaurant.restaurantName);
            if (!restaurantExist) {
              commit('ADD_RESTAURANT', newRestaurant);
            }
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
