import { createApp } from 'vue';
import VueGapi from 'vue-gapi';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(VueGapi, {
  apiKey: 'AIzaSyAQvcg7ps3Ca2wFlXQnHIFKbRgWwgOwRvU',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets',
});
app.provide('gapi', app.config.globalProperties.$gapi);
app.use(store);
app.use(router);
app.mount('#app');
