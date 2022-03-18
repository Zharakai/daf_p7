import { createStore } from 'vuex';

let gAPI;

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

    SET_USER_POSITION(state, pos) {
      // eslint-disable-next-line no-param-reassign
      state.userPosition = pos;
    },

    ADD_RESTAURANT(state, newRestaurant) {
      // eslint-disable-next-line no-param-reassign
      state.restaurantsList.push(newRestaurant);
    },

    ADD_RATING(state, datas) {
      const currentRestaurant = state.restaurantsList.find((restaurant) => {
        const findResult = restaurant.name === datas.currentRestaurant.name;
        return findResult;
      });

      const userRatingsTotal = currentRestaurant.user_ratings_total;
      const { rating } = currentRestaurant;
      const ratingTotal = userRatingsTotal * rating;
      const newRating = datas.rating.rating.value;

      currentRestaurant.reviews.push(datas.rating);
      currentRestaurant.user_ratings_total += 1;

      const newAverage = (ratingTotal + newRating) / currentRestaurant.user_ratings_total;

      currentRestaurant.rating = Math.round(newAverage * 10) / 10;
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
          commit('SET_USER_POSITION', pos);
        },
        (error) => {
          console.log(error.message);
        },
      );
    },

    setLocation({ commit, dispatch }, { lat, lng }) {
      commit('SET_POSITION', { lat, lng });
      dispatch('getRestaurantsNear');
    },

    /**
     * If the restaurant does not exist in the list, add it to the list
     * @param newRestaurant - The new restaurant object that we want to add to the restaurantsList
     * array.
     */
    addRestaurant({ commit, state }, newRestaurant) {
      // eslint-disable-next-line max-len
      const restaurantExist = state.restaurantsList.find((restaurant) => restaurant.name === newRestaurant.name);
      if (!restaurantExist) {
        commit('ADD_RESTAURANT', newRestaurant);
      }
    },

    getRestaurantsNear({ state, commit }, mapRef) {
      if (state.PlacesService === undefined) {
        gAPI = mapRef.value.api;
        // eslint-disable-next-line no-param-reassign
        state.PlacesService = new gAPI.places.PlacesService(document.createElement('div'));
      }

      const { PlacesService } = state;
      const { lat, lng } = state.position;

      const request = {
        location: { lat, lng },
        radius: '1500',
        type: ['restaurant'],
      };

      PlacesService.nearbySearch(request, (results, status) => {
        if (status === gAPI.places.PlacesServiceStatus.OK) {
          results.forEach((restaurant, index) => {
            // eslint-disable-next-line max-len
            const restaurantExist = state.restaurantsList.find((existingRestaurant) => existingRestaurant.name === restaurant.name);
            if (restaurantExist) return;

            const requestDetails = {
              placeId: restaurant.place_id,
              fields: ['name', 'rating', 'geometry', 'formatted_address', 'reviews', 'user_ratings_total'],
            };

            setTimeout(() => {
              PlacesService.getDetails(requestDetails, (place, statusDetails) => {
                if (statusDetails === gAPI.places.PlacesServiceStatus.OK) {
                  commit('ADD_RESTAURANT', place);
                } else {
                  // eslint-disable-next-line no-console
                  console.log(status);
                }
              });
            }, 300 * index);
          });
        }
      });
    },
  },
});
