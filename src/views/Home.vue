<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!--<HelloWorld msg="Salut tout le monde !"/>-->
    <homeMap msg="Test :)"/>
  </div>
</template>

<script>
// import HelloWorld from '../components/HelloWorld.vue';
import homeMap from '../components/homeMap.vue';

export default {
  name: 'Home',
  components: {
    homeMap,
  },
};

/*
export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
*/
</script>
