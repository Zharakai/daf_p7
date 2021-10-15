<template>
  <main>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <div class="restaurantsNav">
        <ul>
          <li
            v-for="restaurant in restaurantsList"
            :key="restaurant.restaurantName">
            <div>
              <p>{{ restaurant.restaurantName }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <router-view/>
  </main>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const { restaurantsList } = store.state;

    console.log(restaurantsList);

    return {
      restaurantsList,
    };
  },
  mounted() {
    // console.log(this.$store.state.restaurantsList);
  },
  mutations() {
    // console.log(this.$store.state);
  },
  methods() {
    // console.log(this.$store.state);
  },
  /*
  methods: {
    vueRestaurants() {
      console.log(this.$store.state.restaurantsList);
    },
  },
  */
};
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#nav {
  padding-top: 30px;
  width: 350px;

  /* height: 18px; */

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

main {
  display: flex;
  height: 100%;
}

.home {
  width: calc(100vw - 350px);
}
</style>
