import { createStore } from 'vuex';

function getAverageRating(ratings) {
  console.log(ratings);
  if (ratings.length === 0) {
    return false;
  }
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
    SET_POSITION(state, pos) {
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
    /**
     * Get the user's current location and store it in the store
     */
    getLocation({ commit }) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          commit('SET_POSITION', pos);
        },
        (error) => {
          console.log(error.message);
        },
      );
    },

    /**
     * If the restaurant does not exist in the list, add it to the list
     * @param newRestaurant - The new restaurant object that we want to add to the restaurantsList
     * array.
     */
    addRestaurant({ commit, state }, newRestaurant) {
      // eslint-disable-next-line max-len
      const restaurantExist = state.restaurantsList.find((restaurant) => restaurant.restaurantName === newRestaurant.restaurantName);
      if (!restaurantExist) {
        commit('ADD_RESTAURANT', newRestaurant);
      }
    },

    /* The fetchRestaurants function fetches the restaurants.json file from the server and then
    dispatches the addRestaurant action for each restaurant in the file. */
    async fetchRestaurants({ dispatch }) {
      try {
        const response = await fetch('/restaurants.json');
        const newRestaurants = await response.json();
        newRestaurants.forEach((newRestaurant) => {
          dispatch('addRestaurant', newRestaurant);
          /*
          // eslint-disable-next-line max-len
          const restaurantExist = state.restaurantsList.find((restaurant) =>
          restaurant.restaurantName === newRestaurant.restaurantName);
          if (!restaurantExist) {
            commit('ADD_RESTAURANT', newRestaurant);
          }
          */
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
