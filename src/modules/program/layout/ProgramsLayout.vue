<template>
    <div class="container">
        <header class="my-5">
            <h2>Lista de programas</h2>
        </header>
        <div class="programs-container">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha creacion</th>
                        <th scope="col">Fecha actualizacion</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <Program
                        v-for="(program, index) in programs"
                        :key="program.uid"
                        :uid="program.uid"
                        :name="program.name"
                        :dateCreated="program.date_created"
                        :dateUpdated="program.date_updated"
                        :index="index + 1"
                    />
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-center">
            <Pagination @getPage="getPage" />
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

import api from '@/api'
export default {
    name: 'programsLayout',
    data() {
        return {
            programs: null,
        }
    },
    created() {
        this.getPrograms()
    },
    unmounted(){
         this.$store.commit('drawflowModule/setPage', 0)
    },
    components: {
        Program: defineAsyncComponent(() =>
            import('../components/ProgramComponent.vue')
        ),
        Pagination: defineAsyncComponent(() =>
            import('../components/PaginationComponent.vue')
        ),
    },
    methods: {
        async getPrograms(offset = 0, first = 10) {
            try {
                const { data } = await api.get(`/programs/${offset}/${first}`)
                this.programs = data.programs
            } catch (error) {
                console.log(error)
            }
        },
        getPage(page) {
            this.getPrograms(page * 10)
        },
    },
}
</script>

<style lang="scss" scoped>
.programs-container {
    min-height: 70vh;
}

tr {
    font-size: 1.3rem;
}
</style>
