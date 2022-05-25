<template>
    <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
    >
        <div class="offcanvas-header">
            <!-- <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h5> -->
            <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
            ></button>
        </div>
        <div class="offcanvas-body">
            <div class="list-group list-group-flush">
                <router-link :to="{ name: 'home' }">
                    <button
                        type="button"
                        class="list-group-item list-group-item-action"
                        aria-current="true"
                    >
                        Inicio
                    </button>
                </router-link>

                <router-link :to="{ name: 'drawflow', params: { id: 'new' } }">
                    <button
                        type="button"
                        class="list-group-item list-group-item-action"
                    >
                        Nuevo programa
                    </button>
                </router-link>

                <router-link :to="{ name: 'program' }">
                    <button
                        type="button"
                        class="list-group-item list-group-item-action"
                    >
                        Listar
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

<style lang="scss" scoped></style>
