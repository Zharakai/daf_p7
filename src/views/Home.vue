// TODO: Move homeMap here
<template>
  <div class="home">
    <homeMap/>
  </div>
</template>

<script>
import homeMap from '../components/homeMap.vue';

export default {
  name: 'Home',
  components: {
    homeMap,
  },
};
</script>
