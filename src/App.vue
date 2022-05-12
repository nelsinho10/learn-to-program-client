<template>
    <Navbar />
    <router-view></router-view>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    name: 'App',
    components: {
        Navbar: defineAsyncComponent(() =>
            import('../src/modules/shared/components/NavbarComponent.vue')
        ),
    },
}
</script>

<style></style>
