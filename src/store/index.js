/* eslint-disable no-restricted-globals */
import { createStore } from 'vuex';

let gAPI;

/*
function getAverageRating(ratings) {
  if (ratings.length === 0) {
    return false;
  }
  // Create an array for each restaurant with their ratings
  const flatRatings = ratings.map((rating) => rating.stars);
  // Take each array previously created to return the average with one decimal
  return Math.round((flatRatings.reduce((a, b) => a + b) / ratings.length) * 10) / 10;
}
*/

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
      // console.log(newRestaurant);
      // eslint-disable-next-line no-param-reassign
      // newRestaurant.average = getAverageRating(newRestaurant.ratings);
      state.restaurantsList.push(newRestaurant);
    },

    ADD_RATING(state, datas) {
      console.log(datas);
      const currentRestaurant = state.restaurantsList.find((restaurant) => {
        const findResult = restaurant.name === datas.currentRestaurant.name;
        return findResult;
      });

      console.log(currentRestaurant);
      currentRestaurant.reviews.push(datas.rating);

      // currentRestaurant.average = getAverageRating(currentRestaurant.ratings);
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
      const restaurantExist = state.restaurantsList.find((restaurant) => restaurant.name === newRestaurant.name);
      if (!restaurantExist) {
        commit('ADD_RESTAURANT', newRestaurant);
      }
    },

    getRestaurantsNear({ state, commit }, mapRef) {
      gAPI = mapRef.value.api;
      const PlacesService = new gAPI.places.PlacesService(document.createElement('div'));
      const lat = mapRef.value.map.center.lat();
      const lng = mapRef.value.map.center.lng();

      const request = {
        location: { lat, lng },
        radius: '1500',
        type: ['restaurant'],
      };

      PlacesService.nearbySearch(request, (results, status) => {
        if (status === gAPI.places.PlacesServiceStatus.OK) {
          console.log(results);
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
