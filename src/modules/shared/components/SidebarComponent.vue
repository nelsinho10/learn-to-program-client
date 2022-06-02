<template>
    <div
        class="offcanvas offcanvas-start bg-sidebar"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
    >
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
            <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
            ></button>
        </div>
        <div class="offcanvas-body">
            <div class="list-group list-group-flush mt-4 mx-3 fs-5">
                <router-link :to="{ name: 'home' }">
                    <button
                        type="button"
                        class="list-group-item list-group-item-action"
                        aria-current="true"
                    >
                        <i class="fa-solid fa-house"></i>
                        Inicio
                    </button>
                </router-link>

                <router-link :to="{ name: 'drawflow', params: { id: 'new' } }">
                    <button
                        type="button"
                        class="list-group-item list-group-item-action"
                    >
                        <i class="fa-solid fa-circle-plus"></i>
                        Nuevo Programa
                    </button>
                </router-link>

                <router-link :to="{ name: 'program' }">
                    <button
                        type="button"
                        class="list-group-item list-group-item-action"
                    >
                        <i class="fa-solid fa-rectangle-list"></i>
                        Lista de Programas
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SidebarComponent',
}
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
    border: 1px solid #09116594;
    border-radius: 8px;
    margin: 5px;
}
.bg-sidebar {
    background-color: #dce9e9f8;
}
</style>
