<template>
    <div class="content m-3">
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
import Drawflow from 'drawflow'
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
