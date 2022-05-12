import { createRouter, createWebHashHistory } from 'vue-router'
import drawflowRouter from '@/modules/drawflow/router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/modules/home/layout/HomeLayout.vue'),
    },
    {
        path: '/drawflow',
        ...drawflowRouter,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
