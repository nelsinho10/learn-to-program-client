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
    components: {
        Board: defineAsyncComponent(() => import('../views/BoardView.vue')),
        Panel: defineAsyncComponent(() => import('../views/LeftPanel.vue')),
        CodeViewer: defineAsyncComponent(() =>
            import('../views/CodeViewer.vue')
        ),
    },
    computed: {
       ...mapGetters('drawflowModule', ['codeViewer']),
    },
}
</script>
