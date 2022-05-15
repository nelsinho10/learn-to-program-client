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
            console.log(this.getEditor.export())
        },
    },
}
</script>

<style lang="scss" scoped>
#drawflow {
    height: 800px;
    // border: 1px solid gray;
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
