import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/my-will',
    name: 'MyWill',
    component: Home
  }, {
    path: '/how-to-use',
    name: 'HowToUse',
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
