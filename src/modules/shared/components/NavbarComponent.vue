<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <div class="d-flex">
                <button
                    @click="setSidebar"
                    class="btn"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample"
                >
                    <i class="fa-solid fa-bars"></i>
                </button>
            </div>

            <button
                class="btn btn-outline-success rounded-circle"
                type="submit"
            >
                <i class="fa-solid fa-user"></i>
            </button>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavbarComponent',
    methods: {
        setSidebar() {
            this.$store.commit('sharedModule/setSidebar')
        },
    },
}
</script>
