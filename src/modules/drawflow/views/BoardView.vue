<template>
    <div class="content m-3">
        <div class="d-flex justify-content-end m-3">
            <button
                @click="changeViewCode"
                type="button"
                class="btn btn-primary btn-sm mx-2"
            >
                {{ codeViewer ? 'Cerrar visor de codigo' : 'Ver codigo' }}
            </button>
            <button type="button" class="btn btn-success btn-sm" @click="save">
                Guardar
            </button>
        </div>
        <div
            id="drawflow"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
        ></div>
    </div>
</template>

<script>
import { createNode } from '../helpers/nodes'
import { events } from '../helpers/events'
import { mapGetters } from 'vuex'
import { generateCode } from '../helpers/generateCode'
import Drawflow from 'drawflow'
import Swal from 'sweetalert2'
import api from '@/api'
import 'drawflow/dist/drawflow.min.css'

export default {
    name: 'BoardView',
    mounted() {
        const id = document.getElementById('drawflow')
        this.createEditor(id)
    },
    computed: {
        ...mapGetters('drawflowModule', ['getEditor', 'codeViewer']),
    },
    methods: {
        createEditor(id) {
            const editor = new Drawflow(id)
            this.$store.commit('drawflowModule/setEditor', editor)
            editor.start()
            events()
        },
        drop(ev) {
            const { screenX, screenY } = ev
            const nameNode = ev.dataTransfer.getData('node')
            createNode(nameNode, screenX - 300, screenY - 280)
        },
        allowDrop(ev) {
            ev.preventDefault()
        },
        changeViewCode() {
            const data = this.getEditor.export().drawflow.Home.data
            const nodes = []
            // generateCode(nodes)
            for (let id of Object.keys(data)) {
                nodes.push({
                    id,
                    ...data[id],
                })
            }
            const code = generateCode(nodes)
            this.$store.commit('drawflowModule/setCodeViewer')
            this.$store.commit('drawflowModule/setProgramCode', code)
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
                preConfirm: (name) => {
                    return this.saveProgram(name)
                },
                allowOutsideClick: () => !Swal.isLoading(),
            }).then((result) => {
                if (result) {
                    Swal.fire(
                        'Programa guardado!',
                        'Su programa se guardo exitosamente!',
                        'success'
                    ).then(() => {})
                }
            })
        },
        async saveProgram(name) {
            const program = this.getEditor.export()
            try {
                const resp = await api.post(`/programs/${name}`, program)
                return resp
            } catch (error) {
                console.log(error)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
#drawflow {
    height: 800px;
    // border: 1px solid gray;<i class="fa-solid fa-bars"></i>
}

.content {
    height: 100%;
    border: 2px solid #d1cfcf;
    border-radius: 8px;
}

li {
    cursor: move;
    // border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
    }
}
</style>
