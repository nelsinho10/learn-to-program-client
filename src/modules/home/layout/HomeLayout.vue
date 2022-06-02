<template>
    <div class="container">
        <header class="py-4">
            <h1>Bienvenido!!</h1>
            <h2>¿Estás listo para aprender a programar?</h2>
        </header>

        <main class="">
            <p class="h5"><i>Nuevo Programa</i></p>
            <section class="">
                <div
                    @click="$router.push('/drawflow/new')"
                    class="card card-menu"
                >
                    <div class="card-body align-self-center">
                        <h1 class=""><i class="fa-solid fa-plus mt-4"></i></h1>
                    </div>
                </div>
            </section>

            <template v-if="existsPrograms">
                <p class="h5 mt-5"><i>Tus creaciones</i></p>
                <section class="d-flex">
                    <div
                        v-for="program in programs"
                        :key="program.uid"
                        @click="$router.push(`/drawflow/${program.uid}`)"
                        class="card card-programs-recent m-2"
                    >
                        <div class="card-body align-self-center text-center">
                            <small><i>Nombre:</i></small>
                            <p>{{ program.name }}</p>
                            <small><i>Fecha:</i></small>
                            <p>{{ program.date_created }}</p>
                        </div>
                    </div>
                </section>
            </template>
        </main>

        <footer></footer>
    </div>
</template>

<script>
import api from '@/api'
import { programsEndpoint } from '@/api/endpoints'
export default {
    name: 'HomeLayout',
    data() {
        return {
            programs: [],
        }
    },
    created() {
        this.recentPrograms()
    },
    methods: {
        async recentPrograms() {
            try {
                const { data } = await api.get(`${programsEndpoint}/0/5`)
                this.programs = data.programs
            } catch (error) {
                console.log(error)
            }
        },
    },
    computed: {
        existsPrograms() {
            return this.programs.length != 0 ? true : false
        },
    },
}
</script>

<style lang="scss" scoped>
.card {
    cursor: pointer;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
    }
}
.card-menu {
    height: 150px;
    width: 150px;
    display: flex;
}

.card-programs-recent {
    height: 180px;
    width: 190px;
    font-size: large;
}
</style>
