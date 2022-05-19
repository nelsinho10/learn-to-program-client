<template>
    <div class="container">
        <div class="my-3">
            <h1>Hola Nelson!!!</h1>
            <h2>Listo para programar</h2>
        </div>

        <h5>Crear nuevo programa</h5>

        <div class="row row-cols-1 row-cols-md-6 g-4">
            <div class="col">
                <div @click="$router.push('/drawflow')" class="card card-menu">
                    <div class="card-body align-self-center">
                        <h1><i class="fa-solid fa-plus"></i></h1>
                    </div>
                </div>
            </div>
        </div>

        <h5>Programas recientes</h5>
        <div class="row row-cols-1 row-cols-md-6 g-4">
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">
                            
                        </p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a short card.</p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">
                            This is a longer card with supporting text below as
                            a natural lead-in to additional content.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">
                            This is a longer card with supporting text below as
                            a natural lead-in to additional content. This
                            content is a little bit longer.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">
                            This is a longer card with supporting text below as
                            a natural lead-in to additional content. This
                            content is a little bit longer.
                        </p>
                    </div>
                </div>
            </div>
        </div>
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
    .card-menu{
       height: 200px !important;
    }
}
</style>
