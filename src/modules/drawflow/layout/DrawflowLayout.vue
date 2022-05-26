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
import api from '@/api'
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'
export default {
    name: 'DrawflowLayout',
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
        ...mapGetters('drawflowModule', ['codeViewer', 'getEditor']),
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
    },
    watch: {
        uid(value) {
            if (value === 'new') {
                this.getEditor.clear()
            }
        },
    },
}
</script>
