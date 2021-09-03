import { createApp } from 'vue';
// import { GoogleMap, Marker } from 'vue3-google-map';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).mount('#app');
