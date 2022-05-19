export default {
    name: 'drawflow',
    component: () =>
        import(
            /* webpackChunkName: "daybook" */ '@/modules/drawflow/layout/DrawflowLayout.vue'
        ),
    props: (route) => {
        const { uid } = route.params
        return {
            uid,
        }
    },
    children: [],
}
