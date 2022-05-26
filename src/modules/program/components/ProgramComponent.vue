<template>
    <tr>
        <th scope="row">{{ (index + 1) }}</th>
        <td>{{ name }}</td>
        <td>{{ dateCreated }}</td>
        <td>{{ dateUpdated }}</td>
        <td>
            <button
                @click="editProgram(uid)"
                type="button"
                class="btn btn-warning mx-2"
            >
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <!-- <button
                @click="deleteProgram(uid)"
                type="button"
                class="btn btn-danger"
            >
                <i class="fa-solid fa-trash"></i>
            </button> -->
        </td>
    </tr>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'ProgramComponent',
    props: {
        index: {
            type: Number,
        },
        name: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: String,
            required: true,
        },
        dateUpdated: {
            type: String,
            required: true,
        },
        uid: {
            type: String,
            required: true,
        }
    },
    methods: {
        async editProgram(uid) {
            this.$router.push({ name: 'drawflow', params: { id: uid } })
            
        },
        deleteProgram(uid) {
            console.log(`delete ${uid}`)
        },
    },
    computed: {
        ...mapGetters('drawflowModule', ['getEditor']),
    },
}
</script>

<style lang="scss" scoped>
tr {
    font-size: 1.3rem;
    width: 20px;
}
</style>
