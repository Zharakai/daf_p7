import { createStore } from 'vuex';

function getAverageRating(ratings) {
  // Create an array for each restaurant with their ratings
  const flatRatings = ratings.map((rating) => rating.stars);
  // Take each array previously created to return the average with one decimal
  return Math.round((flatRatings.reduce((a, b) => a + b) / ratings.length) * 10) / 10;
}

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
      // eslint-disable-next-line no-param-reassign
      newRestaurant.average = getAverageRating(newRestaurant.ratings);
      state.restaurantsList.push(newRestaurant);
    },

    ADD_RATING(state, datas) {
      const currentRestaurant = state.restaurantsList.find((restaurant) => {
        const findResult = restaurant.restaurantName === datas.currentRestaurant.restaurantName;
        return findResult;
      });

      currentRestaurant.ratings.push(datas.rating);

      currentRestaurant.average = getAverageRating(currentRestaurant.ratings);
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

    getRestaurantByName({ state }, name) {
      return state.restaurantsList.find((restaurant) => restaurant.restaurantName === name);
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

    /*
    addRating({ commit, state }) {
      console.log(state);
      commit('ADD_RATING');
    },
    */
  },
});
