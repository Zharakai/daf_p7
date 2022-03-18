import { createRouter, createWebHistory } from 'vue-router';
import HomeNav from '../views/HomeNav.vue';
import Restaurant from '../views/RestaurantCard.vue';
import RestaurantReview from '../views/RestaurantReview.vue';
import AddRestaurant from '../views/AddRestaurant.vue';

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
  {
    path: '/add_restaurant/:lat,:lng',
    name: 'AddRestaurant',
    component: AddRestaurant,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
