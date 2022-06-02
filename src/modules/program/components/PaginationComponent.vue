<template>
    <nav aria-label="Page navigation" class="">
        <ul class="pagination">
            <li
                @click="setPage(page)"
                v-for="(page, index) in numberPages"
                :key="index"
                class="page-item"
                :class="{ active: page === isActive }"
            >
                <a class="page-link">{{ page }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import api from '@/api'
import { programsEndpoint } from '@/api/endpoints'
export default {
    name: 'PaginationComponent',
    created() {
        this.getNumberPages()
    },
    unmounted(){
        this.pages = null
    },
    data() {
        return {
            pages: null,
            isActive: 1,
        }
    },
    methods: {
        async getNumberPages() {
            try {
                const { data } = await api.get(`${programsEndpoint}/count`)
                this.pages = data.programs_counts[0].count
            } catch (error) {
                console.log(error)
            }
        },
        setPage(newPage) {
            this.$emit('getPage', newPage - 1)
            this.$store.commit('drawflowModule/setPage', (newPage - 1) * 10)
            this.isActive = newPage
        },
    },
    computed: {
        numberPages() {
            return Math.ceil(this.pages / 10)
        },
    },
}
</script>

<style lang="scss" scoped>
.page-link {
    color: #000;
}

.pagination:hover {
    cursor: pointer;
}
</style>
>
