<template>
  <main>
    <router-view @change="logChange"/>
    <HomeMap/>
    <!--<MyInput @change="logChange" />-->
  </main>
</template>

<script>
// import { useStore } from 'vuex';
import HomeMap from './views/HomeMap.vue';
// import MyInput from './views/HomeNav.vue';

export default {
  components: { HomeMap/* , MyInput */ },
  setup() {
    // const store = useStore();
    // const { restaurantsList } = store.state;

    function logChange(event) {
      console.log(event);
    }

    // console.log(MyInput);

    return {
      // restaurantsList,
      // MyInput,
      logChange,
    };
  },
  /*
  methods: {
    logChange(event) {
      console.log(event);
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

  .restaurantsNav {
    margin: 16px 0 0 0;

    select {
      margin: 0 0 0 5px;
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
  width: calc(100vw - 350px);
}
</style>
