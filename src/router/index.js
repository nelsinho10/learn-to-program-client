import { createRouter, createWebHashHistory } from 'vue-router'
import drawflowRouter from '@/modules/drawflow/router'
import programRouter from '@/modules/program/router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/modules/home/layout/HomeLayout.vue'),
    },
    {
        path: '/drawflow',
        ...drawflowRouter,
    },
    {
        path: '/programs',
        ...programRouter,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
