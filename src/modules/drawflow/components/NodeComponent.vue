<template>
    <li
        class="list-group-item"
        draggable="true"
        @dragstart="drag($event)"
        :data-node="dataNode"
        :class="color"
    >
        {{ nameNode }}
    </li>
</template>

<script>
export default {
    name: 'NodeComponent',
    props: {
        nameNode: {
            type: String,
            required: true,
        },
        dataNode: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true
        }
    },
    methods: {
        drag(ev) {
            ev.dataTransfer.setData('node', ev.target.getAttribute('data-node'))
        },
    },
}
</script>
