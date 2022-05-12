<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-2">
                <Panel />
            </div>
            <div class="col">
                <Board />
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    name: 'DrawflowLayout',
    components: {
        Board: defineAsyncComponent(() => import('../views/BoardView.vue')),
        Panel: defineAsyncComponent(() => import('../views/LeftPanel.vue')),
    },
}
</script>
