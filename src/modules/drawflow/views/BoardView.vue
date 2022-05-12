<template>
    <div class="m-3">
        <div
            id="drawflow"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
        ></div>
    </div>
</template>

<script>
import Drawflow from 'drawflow'
import 'drawflow/dist/drawflow.min.css'
import { mapGetters } from 'vuex'

export default {
    name: 'BoardView',
    mounted() {
        const id = document.getElementById('drawflow')
        const editor = new Drawflow(id)

        this.$store.commit('drawflowModule/setEditor', editor)

        editor.drawflow = {
            drawflow: {
                Home: {
                    data: {
                        1: {
                            id: 1,
                            name: 'welcome',
                            data: {},
                            class: 'welcome',
                            html: '\n    <div>\n      <div class="title-box">👏 Welcome!!</div>\n      <div class="box">\n        <p>Simple flow library <b>demo</b>\n        <a href="https://github.com/jerosoler/Drawflow" target="_blank">Drawflow</a> by <b>Jero Soler</b></p><br>\n\n ',
                            typenode: false,
                            inputs: {},
                            outputs: {},
                            pos_x: 50,
                            pos_y: 50,
                        },
                    },
                },
            },
        }

        editor.start()
    },
    methods: {
        drop() {
            console.log('DROP')
            var facebook = `
        <div>
          <div class="title-box"><i class="fab fa-facebook"></i> Facebook Message</div>
        </div>
        `
            this.myEditor.addNode(
                'facebook',
                1,
                1,
                0,
                9,
                'facebook',
                {},
                facebook
            )
        },
        allowDrop(event) {
            event.preventDefault()
            console.log('ALLOWDROP')
        },
    },
    computed: {
        ...mapGetters('drawflowModule', ['myEditor']),
    },
}
</script>

<style lang="scss" scoped>
#drawflow {
    height: 800px;
    border: 1px solid gray;
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
