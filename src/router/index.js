import { createRouter, createWebHistory } from 'vue-router';
import HomeNav from '../views/HomeNav.vue';
import Restaurant from '../views/Restaurant.vue';
import RestaurantReview from '../views/RestaurantReview.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeNav,
  },
  {
    path: '/restaurant/:id',
    name: 'Restaurant',
    component: Restaurant,
  },
  {
    path: '/restaurant/:id/review',
    name: 'RestaurantReview',
    component: RestaurantReview,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
