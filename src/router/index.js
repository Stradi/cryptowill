import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CreateWill from "../views/CreateWill.vue";

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/create',
    name: 'CreateWill',
    component: CreateWill
  }, {
    path: '/about',
    name: 'About',
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
