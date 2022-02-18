import { createStore } from 'vuex';

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

    GET_GOOGLE_API(state, gAPI) {
      // console.log(gAPI);
      // eslint-disable-next-line no-param-reassign
      state.gAPI = gAPI;
      console.log(state);

      // console.log(state.gAPI.Map.LatLng(-33.8665433, 151.1956316));

      /*
      const request = {
        location: { lat: 43.64610733307561, lng: 3.8782822539062334 },
        radius: '1500',
        type: ['restaurant'],
      };

      function callback(results, status) {
        console.log(status);
        if (status === state.gAPI.places.PlacesServiceStatus.OK) {
          console.log(results);
          console.log(results.length);
        }
      }

      console.log(request);

      console.log(state.gAPI.places.PlacesServiceStatus);
      console.log(state.gAPI.places.PlacesService.prototype.nearbySearch(request, callback));
      */
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

    test({ state }) {
      console.log(state.position);
      // eslint-disable-next-line no-undef
      // console.log(state.position);
    },
    /* The fetchRestaurants function fetches the restaurants.json file from the server and then
    dispatches the addRestaurant action for each restaurant in the file. */
    async fetchRestaurants(/* { dispatch } */) {
      // console.log(commit('GET_GOOGLE_API', state.gAPI));
      // console.log(state.gAPI);
      // const places = new client.maps.places.PlaceService();
      // console.log(places);

      /*
      const gapi = useGapi();
      const client = await gapi.getGapiClient();
      console.log(client.client.load('places'));
      console.log(client.map.places);
      // console.log(gapi.getGapiClient());
      console.log(gapi.clientProvider.clientConfig.discoveryDocs[0]);
      */

      /*
      gapi.login().then(({ currentUser, client, hasGrantedScopes }) => {
        console.log({ currentUser, client, hasGrantedScopes });
      });
      */
      /*
      const myHeaders = new Headers({
        'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Content-Type': 'text/plain',
        'X-Custom-Header': 'ProcessThisImmediately',
        'Access-Control-Allow-Methods': 'GET',
      });

      const myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
      };
      */

      try {
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

    /*
    addRating({ commit, state }) {
      console.log(state);
      commit('ADD_RATING');
    },
    */
  },
});
