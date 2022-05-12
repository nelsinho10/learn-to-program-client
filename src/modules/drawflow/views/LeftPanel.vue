<template>
    <!-- <small>Operaciones matematicas</small> -->

    <div class="card m-3">
        <ul class="list-group list-group-flush">
            <li
                class="list-group-item"
                draggable="true"
                @dragstart="drag($event)"
            >
                Asignacion
            </li>
        </ul>
    </div>

    <!-- <small>Operaciones matematicas</small> -->
    <div class="card m-3">
        <ul class="list-group list-group-flush">
            <li class="list-group-item" draggable="true">Sumar</li>
            <li class="list-group-item" draggable="true">Restar</li>
            <li class="list-group-item" draggable="true">Multiplicacion</li>
            <li class="list-group-item" draggable="true">Division</li>
        </ul>
    </div>
    <!-- <small>Estructuras de control</small> -->
    <div class="card m-3">
        <ul class="list-group list-group-flush">
            <li class="list-group-item" draggable="true">Desicion</li>
            <li class="list-group-item" draggable="true">Repeticion</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'LeftPanel',
    computed: {
        ...mapGetters('drawflowModule', ['myEditor']),
    },
    mounted(){
        console.log(this.myEditor);
    },
    methods: {
        drag(event){
            console.log(event);
        }
    }
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
