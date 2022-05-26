import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/modules/home/layout/HomeLayout.vue'),
    },
    {
        path: '/drawflow/:id',
        name: 'drawflow',
        component: () => import('@/modules/drawflow/layout/DrawflowLayout.vue'),
        props: (route) => {
            const { id } = route.params
            return {
                uid: id,
            }
        },
    },
    {
        path: '/programs',
        name: 'program',
        component: () => import('@/modules/program/layout/ProgramsLayout.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
