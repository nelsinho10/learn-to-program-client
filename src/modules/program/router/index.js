export default {
    name: 'program',
    component: () =>
        import(
            /* webpackChunkName: "daybook" */ '@/modules/program/layout/ProgramsLayout.vue'
        ),
    children: [],
}
