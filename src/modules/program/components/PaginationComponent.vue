<template>
    <nav aria-label="Page navigation" class="">
        <ul class="pagination bg">
            <li
                @click="setPage(page)"
                v-for="(page, index) in numberPages"
                :key="index"
                class="page-item"
            >
                <a class="page-link">{{ page }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import api from '@/api'
export default {
    name: 'PaginationComponent',
    created() {
        this.getNumberPages()
    },
    data() {
        return {
            pages: null,
        }
    },
    methods: {
        async getNumberPages() {
            try {
                const { data } = await api.get(`/programs/count`)
                this.pages = data.programs_counts[0].count
            } catch (error) {
                console.log(error)
            }
        },
        setPage(newPage) {
            this.$emit('getPage', newPage)
        },
    },
    computed: {
        numberPages() {
            return this.pages / 10 < 1 ? 1 : Math.round(this.pages / 10)
        },
    },
}
</script>

<style>
.page-link {
    color: #000;
}
</style>
