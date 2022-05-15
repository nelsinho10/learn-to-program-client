<template>
    <Navbar />
    <Sidebar />
    <router-view></router-view>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    name: 'App',
    components: {
        Navbar: defineAsyncComponent(() =>
            import('@/modules/shared/components/NavbarComponent.vue')
        ),
        Sidebar: defineAsyncComponent(() =>
            import('@/modules/shared/components/SidebarComponent.vue')
        ),
    },
}
</script>
