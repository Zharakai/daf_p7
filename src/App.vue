<template>
  <main>
    <div id="nav">
      <div class="navMenu">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <div class="restaurantsNav">
        <ul>
          <li
            v-for="restaurant in restaurantsList"
            :key="restaurant.restaurantName">
            <a href="#">
              <div>
                <p>{{ restaurant.restaurantName }}</p>
                <!-- eslint-disable-next-line max-len -->
                <!--<p v-for="(sub, index) in restaurant" :key="index">{{ sub.ratings[index] }}</p>-->
                <p>{{ restaurant.ratings }}</p>
                <p>{{ restaurant.address }}</p>
              </div>
            </a>
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

    restaurantsList.forEach((restaurant, i) => {
      // eslint-disable-next-line no-param-reassign
      // restaurant.averageArray = [];
      const average = 'test';
      restaurant.ratings.forEach((rating) => {
        // restaurant.averageArray.push(rating.stars);
        // const average
        console.log(average, i);
        console.log(rating.stars);
      });
    });

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
  overflow: auto;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
    &:hover {
        background: #9ea93f1f
      }

    a {
      text-decoration: none;
      font-weight: normal;

      div {
        padding: 5px;
      }
    }

    p {
      text-align: left;
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
