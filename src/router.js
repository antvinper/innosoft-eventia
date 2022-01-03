import { createRouter, createWebHashHistory } from 'vue-router';
import axios from 'axios';
import Crud from './views/CrudDemo.vue';
import Login from './views/Login.vue';

const routes = [
    {
        path: '/',
        name: 'crud',
        meta: { requiresAuth: true },
        component: Crud,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    axios.get('/api/v1/peticionesPublicacion')
    .catch(err => {
      if (err.response.status === 401) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    });
  } else {
    next()
  }
})

export default router;
