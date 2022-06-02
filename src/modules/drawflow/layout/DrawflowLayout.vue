<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-end pt-2">
            <button
                @click="changeViewCode"
                type="button"
                class="btn-sm"
                :class="color"
            >
                {{ codeViewer ? 'Cerrar visor de codigo' : 'Ver codigo' }}
            </button>
            <button
                type="button"
                class="btn btn-success btn-sm mx-3"
                @click="actionProgram"
            >
                {{ isUpdated ? 'Actualizar' : 'Guardar' }}
            </button>
        </div>
        <div class="row">
            <div class="col-2">
                <Panel />
            </div>
            <div class="col">
                <Board />
            </div>
            <div v-if="codeViewer" class="col-4">
                <CodeViewer :uid="uid" />
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api'
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'
import { generateCode } from '../helpers/generateCode'
import Swal from 'sweetalert2'
import { programsEndpoint } from '@/api/endpoints'
export default {
    name: 'DrawflowLayout',
    data() {
        return {
            color: 'btn btn-primary',
            codeViewer: false,
            saveUid: '',
            isUpdated: false,
        }
    },
    props: {
        uid: String,
    },
    created() {
        if (this.uid !== 'new') {
            this.getProgram()
            this.isUpdated = true
        }
    },
    components: {
        Board: defineAsyncComponent(() => import('../views/BoardView.vue')),
        Panel: defineAsyncComponent(() => import('../views/LeftPanel.vue')),
        CodeViewer: defineAsyncComponent(() =>
            import('../views/CodeViewer.vue')
        ),
    },
    computed: {
        ...mapGetters('drawflowModule', ['getEditor']),
    },
    methods: {
        async getProgram() {
            try {
                const { program } = await (
                    await api.get(`${programsEndpoint}/${this.uid}`)
                ).data

                this.getEditor.import(JSON.parse(program[0].program))
            } catch (error) {
                console.log(error)
            }
        },
        changeViewCode() {
            const data = this.getEditor.export().drawflow.Home.data
            const nodes = []

            for (let id of Object.keys(data)) {
                nodes.push({
                    id,
                    ...data[id],
                })
            }

            const code = generateCode(nodes)
            this.$store.commit('drawflowModule/setProgramCode', code)
            if (this.uid !== 'new') this.changeColor()
            if (this.uid === 'new') this.showAlert()
        },
        changeColor() {
            this.color =
                this.color === 'btn btn-primary'
                    ? 'btn btn-danger'
                    : 'btn btn-primary'

            this.codeViewer = this.codeViewer === true ? false : true
        },
        showAlert() {
            Swal.fire(
                'Por favor guarde el programa!',
                'Para poder ejecutar el programa es necesario guardarlo',
                'warning'
            )
        },
        actionProgram() {
            if (this.isUpdated) {
                this.update()
            } else {
                this.save()
            }
        },
        async update() {
            try {
                const result = await Swal.fire({
                    title: `¿Desea actualizar el progrma?`,
                    text: 'No podra revertir esta accion!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, actualizar!',
                    cancelButtonText: 'Cancelar',
                })

                if (result.isConfirmed) {
                    this.updatedProgram()
                    Swal.fire(
                        'Programa actualizado!',
                        'El programa se ha actalizado con exito.',
                        'success'
                    )
                }
            } catch (error) {
                console.log(error)
            }
        },
        async save() {
            try {
                const result = await Swal.fire({
                    title: 'Ingrese el nombre del programa',
                    input: 'text',
                    inputAttributes: {
                        autocapitalize: 'off',
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Guardar',
                    showLoaderOnConfirm: true,
                    cancelButtonText: 'Cancelar',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'Por favor ingrese el nombre del programa!'
                        }
                    },
                    preConfirm: (name) => {
                        return this.saveProgram(name)
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                })

                if (result.isConfirmed) {
                    this.$router.push({
                        name: 'drawflow',
                        params: { id: this.saveUid },
                    })
                    Swal.fire(
                        'Programa guardado!',
                        'Su programa se guardo exitosamente!',
                        'success'
                    )
                }
            } catch (error) {
                console.log(error)
            }
        },
        async saveProgram(name) {
            const program = this.getEditor.export()
            try {
                const { data } = await api.post(`${programsEndpoint}/${name}`, program)
                this.saveUid = data
            } catch (error) {
                console.log(error)
            }
        },
        async updatedProgram() {
            const program = this.getEditor.export()
            try {
                await api.patch(`${programsEndpoint}/${this.uid}`, program)
            } catch (error) {
                console.log(error)
            }
        },
    },
    watch: {
        uid(value) {
            if (value === 'new') {
                this.getEditor.clear()
                this.saveUid = ''
                this.isUpdated = false
            }

            if(value !== 'new'){
                this.isUpdated = true
            }
        },
    },
}
</script>
