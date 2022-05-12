export default {
    name: 'drawflow',
    component: () =>
        import(
            /* webpackChunkName: "daybook" */ '@/modules/drawflow/layout/DrawflowLayout.vue'
        ),
    children: [],
}
