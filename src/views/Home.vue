<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <homeMap/>
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
</script>
