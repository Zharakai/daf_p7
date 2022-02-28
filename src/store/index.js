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
      const currentRestaurant = state.restaurantsList.find((restaurant) => {
        const findResult = restaurant.restaurantName === datas.currentRestaurant.restaurantName;
        return findResult;
      });

      currentRestaurant.ratings.push(datas.rating);

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
      // console.log(newRestaurant);
      // eslint-disable-next-line max-len
      const restaurantExist = state.restaurantsList.find((restaurant) => restaurant.restaurantName === newRestaurant.restaurantName);
      // console.log(restaurantExist);
      if (!restaurantExist) {
        commit('ADD_RESTAURANT', newRestaurant);
      }
    },

    getRestaurantsNear({ state }, mapRef) {
      gAPI = mapRef.value.api;

      // console.log(state.position);
      // console.log(mapRef.value.map.center.lat(), mapRef.value.map.center.lng());
      const request = {
        location: { lat: 43.64610733307561, lng: 3.8782822539062334 },
        radius: '1500',
        type: ['restaurant'],
      };

      function callback(results, status) {
        if (status === gAPI.places.PlacesServiceStatus.OK) {
          // console.log(results);
          // eslint-disable-next-line no-param-reassign
          state.restaurantsList = results;
        }
      }

      const PlacesService = new gAPI.places.PlacesService(document.createElement('div'));
      PlacesService.nearbySearch(request, callback);
    },

    getPlacesDetails({ dispatch }, restaurantsList) {
      const PlacesService = new gAPI.places.PlacesService(document.createElement('div'));

      restaurantsList.forEach((restaurant, index) => {
        const request = {
          placeId: restaurant.place_id,
          fields: ['name', 'rating', 'photos', 'geometry', 'formatted_address', 'review'],
        };

        setTimeout(() => {
          function callback(place, status) {
            if (status === gAPI.places.PlacesServiceStatus.OK) {
              // commit('ADD_RESTAURANT', place);
              dispatch('addRestaurant', place);
            } else {
              console.log(status);
            }
          }
          PlacesService.getDetails(request, callback);
        }, 300 * index);
      });
    },
  },
});
