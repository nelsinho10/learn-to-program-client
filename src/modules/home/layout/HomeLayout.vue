<template>
    <div class="container">
        <header class="py-4">
            <h1>Hola Nelson !!</h1>
            <h2>Estas listo para aprender a programar</h2>
        </header>

        <main class="">
            <p class="h5"><i>Nuevo Programa</i></p>
            <section class="">
                <div
                    @click="$router.push('/drawflow/new')"
                    class="card card-menu"
                >
                    <div class="card-body align-self-center">
                        <h1><i class="fa-solid fa-plus"></i></h1>
                    </div>
                </div>
            </section>

            <p class="h5 my-3"><i>Programas Recientes</i></p>
            <section class="d-flex">
                <div
                    v-for="i in 5"
                    :key="i"
                    @click="$router.push('/drawflow/new')"
                    class="card card-menu m-2"
                >
                    <div class="card-body align-self-center">
                        <p></p>
                    </div>
                </div>
            </section>
        </main>

        <footer></footer>
    </div>
</template>

<script>
export default {
    name: 'HomeLayout',
    methods: {},
}
</script>

<style lang="scss" scoped>
.card {
    cursor: pointer;
    // border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
    }
}
.card-menu {
    height: 150px !important;
    width: 150px !important;
    display: flex;
}
</style>
