<template>
  <main>
    <router-view :restaurants="restaurantsFiltered" /> <!-- data -->
    <HomeMap :restaurants="restaurantsFiltered" />
  </main>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import HomeMap from './views/HomeMap.vue';
import EventBus from '@/EventBus';

export default {
  components: { HomeMap },
  setup() {
    const route = useRoute();
    const minRate = ref(0);
    const maxRate = ref(5);
    let restaurantsFiltered;
    let restaurant;

    function updateMinMax({ type, value }) {
      if (type === 'min') {
        minRate.value = value;
        return;
      }
      maxRate.value = value;
    }

    if (!route.params.id) {
      const store = useStore();
      const restaurantsList = computed(() => store.state.restaurantsList);

      // eslint-disable-next-line arrow-body-style
      restaurantsFiltered = computed(() => restaurantsList.value.filter(({ average }) => {
        return average >= minRate.value && average <= maxRate.value;
      }));

      EventBus.on('updateFilter', updateMinMax);
    } else if (route.params.id) {
      console.log(route.params.id);
    }
    /*
    const store = useStore();
    const restaurantsList = computed(() => store.state.restaurantsList);
    const minRate = ref(0);
    const maxRate = ref(5);

    // Receve new restaurant here

    // eslint-disable-next-line arrow-body-style
    const restaurantsFiltered = computed(() => restaurantsList.value.filter(({ average }) => {
      return average >= minRate.value && average <= maxRate.value;
    }));

    function updateMinMax({ type, value }) {
      if (type === 'min') {
        minRate.value = value;
        return;
      }
      maxRate.value = value;
    }

    EventBus.on('updateFilter', updateMinMax);

    */
    return {
      restaurantsFiltered, // data
      restaurant,
    };
  },
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
  width: 400px;
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
  .restaurantsNav {
    margin: 16px 0 0 0;
    font-family: 'Roboto', sans-serif;
    select {
      margin: 0 0 0 5px;
    }
    ul {
      i {
        margin: 0 5px 0 0;
        color: #ff9e16;
      }
    }
  }
  .hidden {
    display: none;
  }
  .visible {
    display: block;
  }
}
main {
  display: flex;
  height: 100%;
}
.home {
  width: calc(100vw - 400px);
}
</style>
