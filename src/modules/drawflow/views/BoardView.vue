<template>
    <div class="content m-3">
        <div class="d-flex justify-content-end m-3">
            <button
                @click="changeViewCode"
                type="button"
                class="btn btn-primary btn-sm mx-2"
            >
                {{ codeViewer ? 'Cerrar visor' : 'Ver codigo' }}
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
import { mapGetters } from 'vuex'
import { createNode } from '../helpers/methods'
import Drawflow from 'drawflow'
import 'drawflow/dist/drawflow.min.css'

export default {
    name: 'BoardView',
    mounted() {
        const id = document.getElementById('drawflow')
        const editor = new Drawflow(id)
        this.$store.commit('drawflowModule/setEditor', editor)
        editor.start()

        editor.on('connectionCreated', ({ output_id, input_id }) => {
            // console.log(output_id, input_id, output_class, input_class)

            // Obtener los nodos
            const nodeOutput = editor.getNodeFromId(output_id)
            const nodeInput = editor.getNodeFromId(input_id)

            if (nodeInput.name == 'assign') {
                editor.updateNodeDataFromId(input_id, {
                    name: String(nodeInput.data.name),
                    val: nodeOutput.data.val,
                })
            }
            if (nodeInput.name == 'add') {
                console.log('viendo el input', nodeInput.data.name)

                let salida = nodeOutput.data.name
                // Saber si existe el name para determinar si es numero o variable
                if (salida) {
                    if (nodeInput.data.name) {
                        salida = `${nodeInput.data.name} + ${salida}`
                    }
                }

                if (!salida) {
                    if (nodeInput.data.name) {
                        salida = `${nodeInput.data.name} + ${nodeOutput.data.val}`
                    } else {
                        salida = `${nodeOutput.data.val}`
                    }
                }

                let val = nodeInput.data.val
                val = val + Number(nodeOutput.data.val)
                editor.updateNodeDataFromId(input_id, {
                    val,
                    name: salida,
                })

                console.log(salida)
            }
        })

        // editor.on('nodeDataChanged', (id) => {
        //     console.log('Node data changed ' + id)
        // })
    },
    computed: {
        ...mapGetters('drawflowModule', ['getEditor', 'codeViewer']),
    },
    methods: {
        drop(ev) {
            const { screenX, screenY } = ev
            const nameNode = ev.dataTransfer.getData('node')
            createNode(nameNode, screenX - 300, screenY - 280)
        },
        allowDrop(ev) {
            ev.preventDefault()
        },
        changeViewCode() {
            this.$store.commit('drawflowModule/setCodeViewer')
        },
        save() {
            const nodes = this.getEditor.export().drawflow.Home
            // for (let i in nodes) {
            //     for (let j in nodes[i]) {
            //         console.log(nodes[i][j])
            //     }
            // }
            console.log(nodes)
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
