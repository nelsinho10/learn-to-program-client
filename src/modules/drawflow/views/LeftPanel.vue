<template>
    <div class="m-3">
        <p class="text-center fst-italic fw-bolder">Tipos de Datos</p>
        <div class="card m-3">
            <ul class="list-group list-group-flush">
                <Node
                    v-for="node in dataType"
                    :key="node.dataNode"
                    :nameNode="node.nameNode"
                    :dataNode="node.dataNode"
                    color="list-group-item-primary"
                />
            </ul>
        </div>
        <p class="text-center fst-italic fw-bolder">Funciones</p>
        <div class="card m-3">
            <ul class="list-group list-group-flush">
                <Node
                    v-for="node in funcs"
                    :key="node.dataNode"
                    :nameNode="node.nameNode"
                    :dataNode="node.dataNode"
                    color="list-group-item-success"
                />
            </ul>
        </div>
        <p class="text-center fst-italic fw-bolder">Operaciones Matematicas</p>
        <div class="card m-3">
            <ul class="list-group list-group-flush">
                <Node
                    v-for="node in operations"
                    :key="node.dataNode"
                    :nameNode="node.nameNode"
                    :dataNode="node.dataNode"
                    color="list-group-item-warning"
                />
            </ul>
        </div>
        <p class="text-center fst-italic fw-bolder">Esructuras de control</p>
        <div class="card m-3">
            <ul class="list-group list-group-flush">
                <Node
                    v-for="node in controlStructured"
                    :key="node.dataNode"
                    :nameNode="node.nameNode"
                    :dataNode="node.dataNode"
                    color="list-group-item-info"
                />
            </ul>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import * as node from '../helpers/templates'
export default {
    name: 'LeftPanel',
    components: {
        Node: defineAsyncComponent(() =>
            import('../components/NodeComponent.vue')
        ),
    },
    data() {
        return {
            dataType: node.dataType,
            funcs: node.funcsNodes,
            operations: node.operationsNodes,
            controlStructured: node.controlStructuresNodes,
        }
    },
}
</script>

<style lang="scss" scoped>
li {
    cursor: move;
    // border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 35);
    }
}
</style>
