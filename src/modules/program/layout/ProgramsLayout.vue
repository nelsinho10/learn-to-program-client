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
                    />
                </tbody>
            </table>
        </div>

        <nav
            class="d-flex justify-content-center"
            aria-label="Page navigation example"
        >
            <ul class="pagination">
                <li class="page-item">
                    <a class="page-link" href="#">Previous</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
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
    },
    methods: {
        async getPrograms() {
            try {
                const programs = await fetch(
                    `http://localhost:3000/api/programs/`
                ).then((r) => r.json())
                this.programs = programs.programs
                console.log(programs)
            } catch (error) {
                console.log('Error mi papa')
            }
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
