import { createRouter, createWebHashHistory } from 'vue-router';
import Crud from './pages/CrudDemo.vue';

const routes = [
    {
        path: '/',
        name: 'crud',
        component: Crud,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
