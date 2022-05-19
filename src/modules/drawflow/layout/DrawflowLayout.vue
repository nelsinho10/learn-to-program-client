<template>
    <div class="container-fluid">
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
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'
export default {
    name: 'DrawflowLayout',
    props: {
        uid: String,
    },
    created() {
        if (this.uid) {
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
        ...mapGetters('drawflowModule', ['codeViewer', 'getEditor']),
    },
    methods: {
        async getProgram() {
            try {
                const program = await fetch(
                    `http://localhost:3000/api/programs/${this.uid}`
                ).then((r) => r.json())
                const programEditor = JSON.parse(program.program[0].program)
                console.log(programEditor)
                this.getEditor.import(programEditor)
            } catch (error) {
                console.log('Error mi papa')
            }
        },
    },
}
</script>
