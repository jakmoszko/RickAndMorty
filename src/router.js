import { createRouter, createWebHistory } from 'vue-router';

import AddMessage from './pages/message/AddMessage.vue';
import TheHistory from './pages/history/TheHistory.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/message'},
    { path: '/message', component: AddMessage },
    { path: '/history', component: TheHistory }
  ],
});

export default router;