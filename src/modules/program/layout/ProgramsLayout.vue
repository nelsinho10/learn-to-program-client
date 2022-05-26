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
                        :index="index"
                        :page="page"
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
import { paginationRange } from '../helpers/pagination'

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
    components: {
        Program: defineAsyncComponent(() =>
            import('../components/ProgramComponent.vue')
        ),
        Pagination: defineAsyncComponent(() =>
            import('../components/PaginationComponent.vue')
        ),
    },
    methods: {
        async getPrograms(initial = 0, final = 10) {
            try {
                const { data } = await api.get(`/programs/${initial}/${final}`)
                this.programs = data.programs
            } catch (error) {
                console.log(error)
            }
        },
        getPage(data) {
            const { initial, final } = paginationRange[data]
            this.getPrograms(initial, final)
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
