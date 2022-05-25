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
import { events } from '../helpers/events/'
import { mapGetters } from 'vuex'
import 'drawflow/dist/drawflow.min.css'
import Drawflow from 'drawflow'

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
            this.$store.commit('drawflowModule/setCodeViewer')
        },
        save() {
            let blocks = []
            let blocksS = []
            let codeProgram = ''
            const nodes = this.getEditor.export().drawflow.Home
            for (let i in nodes) {
                for (let j in nodes[i]) {
                    if (nodes[i][j].name === 'block') {
                        let nodeComment = {
                            id: nodes[i][j].id,
                            comment: nodes[i][j].data.code,
                        }
                        blocks.push(nodeComment)
                    }
                    if (nodes[i][j].name === 'blockS') {
                        let nodeComment = {
                            id: nodes[i][j].data.blockId,
                            comment: nodes[i][j].data.code,
                            isTrue: nodes[i][j].data.isTrue,
                        }
                        blocksS.push(nodeComment)
                    }
                }
            }

            blocks.forEach(({ id, comment }) => {
                codeProgram = codeProgram.concat('\n\n', comment)

                for (let i in nodes) {
                    for (let j in nodes[i]) {
                        if (id === nodes[i][j].data.blockId) {
                            if (nodes[i][j].name == 'assign') {
                                codeProgram = codeProgram.concat(
                                    '\n',
                                    nodes[i][j].data.code
                                )
                            }
                            if (nodes[i][j].name == 'print') {
                                codeProgram = codeProgram.concat(
                                    '\n',
                                    nodes[i][j].data.code
                                )
                            }
                            if (nodes[i][j].name == 'for') {
                                codeProgram = codeProgram.concat(
                                    '\n',
                                    nodes[i][j].data.code
                                )

                                blocksS.forEach(({ id, comment }) => {

                                    if (nodes[i][j].id === id) {
                                        codeProgram = codeProgram.concat(
                                            '\n\t',
                                            comment
                                        )

                                        for (let i in nodes) {
                                            for (let j in nodes[i]) {
                                                if (
                                                    nodes[i][j].data.blockId ===
                                                    id
                                                ) {
                                                    if (
                                                        nodes[i][j].name ==
                                                        'assign'
                                                    ) {
                                                        codeProgram =
                                                            codeProgram.concat(
                                                                '\n\t',
                                                                nodes[i][j].data
                                                                    .code
                                                            )
                                                    }
                                                    if (
                                                        nodes[i][j].name ==
                                                        'print'
                                                    ) {
                                                        codeProgram =
                                                            codeProgram.concat(
                                                                '\n\t',
                                                                nodes[i][j].data
                                                                    .code
                                                            )
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })
                            }

                            if (nodes[i][j].name == 'if') {
                                codeProgram = codeProgram.concat(
                                    '\n',
                                    nodes[i][j].data.code
                                )

                                blocksS.forEach(({ comment, isTrue, id }) => {
                                    if (isTrue && nodes[i][j].id === id) {
                                        codeProgram = codeProgram.concat(
                                            '\n\t',
                                            comment
                                        )

                                        for (let i in nodes) {
                                            for (let j in nodes[i]) {
                                                if (
                                                    nodes[i][j].data.blockId ===
                                                        id &&
                                                    nodes[i][j].data.isTrue ===
                                                        true
                                                ) {
                                                    if (
                                                        nodes[i][j].name ==
                                                        'assign'
                                                    ) {
                                                        codeProgram =
                                                            codeProgram.concat(
                                                                '\n\t',
                                                                nodes[i][j].data
                                                                    .code
                                                            )
                                                    }
                                                    if (
                                                        nodes[i][j].name ==
                                                        'print'
                                                    ) {
                                                        console.log(
                                                            'viendo si entra al mero print'
                                                        )
                                                        codeProgram =
                                                            codeProgram.concat(
                                                                '\n\t',
                                                                nodes[i][j].data
                                                                    .code
                                                            )
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })

                                codeProgram = codeProgram.concat('\n', 'else:')

                                blocksS.forEach(({ comment, isTrue, id }) => {
                                    if (!isTrue && nodes[i][j].id === id) {
                                        codeProgram = codeProgram.concat(
                                            '\n\t',
                                            comment
                                        )

                                        for (let i in nodes) {
                                            for (let j in nodes[i]) {
                                                if (
                                                    nodes[i][j].data.blockId ===
                                                        id &&
                                                    nodes[i][j].data.isTrue ===
                                                        false
                                                ) {
                                                    if (
                                                        nodes[i][j].name ==
                                                        'assign'
                                                    ) {
                                                        codeProgram =
                                                            codeProgram.concat(
                                                                '\n\t',
                                                                nodes[i][j].data
                                                                    .code
                                                            )
                                                    }
                                                    if (
                                                        nodes[i][j].name ==
                                                        'print'
                                                    ) {
                                                        codeProgram =
                                                            codeProgram.concat(
                                                                '\n\t',
                                                                nodes[i][j].data
                                                                    .code
                                                            )
                                                    }
                                                }
                                            }
                                        }
                                    }
                                })
                            }
                        }
                    }
                }
            })

            console.log(this.getEditor.export().drawflow.Home)
            console.log(codeProgram)
            console.log(blocks)
            console.log(blocksS)
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
