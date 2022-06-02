<template>
    <tr>
        <th scope="row">{{ index + getPage }}</th>
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
            <button
                @click="deleteProgram(uid, name)"
                type="button"
                class="btn btn-danger"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    </tr>
</template>

<script>
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'
import api from '@/api'
import { programsEndpoint } from '@/api/endpoints'
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
        },
    },
    methods: {
        editProgram(uid) {
            this.$router.push({ name: 'drawflow', params: { id: uid } })
        },
        async deleteProgram(uid, name) {
            try {
                const result = await Swal.fire({
                    title: `¿Desea eliminar el programa "${name}" ?`,
                    text: 'No podra revertir esta accion!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'Cancelar',
                })

                if (result.isConfirmed) {
                    this.deleteNode(uid)
                    const confirmed = await Swal.fire(
                        'Eliminado!',
                        'Su programa a sido eliminado correctamente.',
                        'success'
                    )
                    if (confirmed.isConfirmed) {
                        this.$router.go()
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        async deleteNode(uid) {
            try {
                await api.delete(`${programsEndpoint}/${uid}`)
            } catch (error) {
                console.log(error)
            }
        },
    },
    computed: {
        ...mapGetters('drawflowModule', ['getEditor', 'getPage']),
    },
}
</script>

<style lang="scss" scoped>
tr {
    font-size: 1.3rem;
    width: 20px;
}
</style>
