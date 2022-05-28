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
                @click="save"
            >
                Guardar
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
                <CodeViewer />
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
export default {
    name: 'DrawflowLayout',
    data() {
        return {
            color: 'btn btn-primary',
            codeViewer: false,
            saveUid: '',
        }
    },
    props: {
        uid: String,
    },
    created() {
        if (this.uid !== 'new') {
            this.getProgram()
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
                    await api.get(`programs/${this.uid}`)
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
            this.changeColor()
        },
        changeColor() {
            this.color =
                this.color === 'btn btn-primary'
                    ? 'btn btn-danger'
                    : 'btn btn-primary'

            this.codeViewer = this.codeViewer === true ? false : true
        },
        save() {
            Swal.fire({
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
            }).then((result) => {
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
            })
        },
        async saveProgram(name) {
            const program = this.getEditor.export()
            try {
                const { data } = await api.post(`/programs/${name}`, program)
                this.saveUid = data
            } catch (error) {
                console.log(error)
            }
        },
    },
    watch: {
        uid(value) {
            if (value === 'new') {
                this.getEditor.clear()
            }
        },
    },
    unmounted() {
        this.saveUid = ''
    },
}
</script>
