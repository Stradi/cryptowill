import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from "../views/Dashboard.vue";
import Help from "../views/Help.vue";

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }, {
    path: '/help',
    name: 'Help',
    component: Help
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
