/* eslint-disable no-restricted-globals */
import { createStore } from 'vuex';

let gAPI;

function getAverageRating(ratings) {
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

    GET_RESTAURANTS_NEAR(state, mapRef) {
      gAPI = mapRef.value.api;

      const request = {
        location: { lat: 43.64610733307561, lng: 3.8782822539062334 },
        radius: '1500',
        type: ['restaurant'],
      };

      function callback(results, status) {
        if (status === gAPI.places.PlacesServiceStatus.OK) {
          // eslint-disable-next-line no-param-reassign
          state.restaurantsList = results;
        }
      }

      const PlacesService = new gAPI.places.PlacesService(document.createElement('div'));
      PlacesService.nearbySearch(request, callback);
    },

    GET_PLACES_DETAILS(state, restaurantsList) {
      const formattedRestaurantsList = [];

      restaurantsList.forEach((restaurant) => {
        const request = {
          placeId: restaurant.place_id,
          fields: ['name', 'rating', 'photos', 'geometry', 'formatted_address', 'review'],
        };

        setTimeout(() => {
          function callback(place, status) {
            if (status === gAPI.places.PlacesServiceStatus.OK) {
              formattedRestaurantsList.push(place);
            } else {
              console.log(status);
            }
          }

          // setTimeout(() => {
          const PlacesService = new gAPI.places.PlacesService(document.createElement('div'));
          PlacesService.getDetails(request, callback);
        }, 700);
      });

      // eslint-disable-next-line no-param-reassign
      state.formattedRestaurantsList = formattedRestaurantsList;
    },

    TEST(/* state */) {
      // console.log(state);
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

    test({ commit /* , state */ }) {
      commit('TEST');
      // console.log(state.position);
      // console.log(state);
      // eslint-disable-next-line no-undef
      // console.log(state.position);
    },
    /* The fetchRestaurants function fetches the restaurants.json file from the server and then
    dispatches the addRestaurant action for each restaurant in the file. */
    async fetchRestaurants(/* state, { dispatch } */) {
      // console.log(state.restaurantsList);

      try {
        // console.log(state);
        /*
        const test = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=43.66358318187707,3.8876292886718566&radius=1500&type=restaurant&key=AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU');
        const newTest = await test.json();
        console.log(newTest);
        */

        /*
        const response = await fetch('/restaurants.json');
        const newRestaurants = await response.json();
        newRestaurants.forEach((newRestaurant) => {
          dispatch('addRestaurant', newRestaurant);
        });
        */
      } catch (error) {
        console.error(error);
      }
    },

    getPlacesDetails({ commit }, restaurantsList) {
      commit('GET_PLACES_DETAILS', restaurantsList);
    },

    /*
    addRating({ commit, state }) {
      console.log(state);
      commit('ADD_RATING');
    },
    */
  },
});
