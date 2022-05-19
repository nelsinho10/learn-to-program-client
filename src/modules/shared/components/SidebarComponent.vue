<template>
    <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
    >
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Titulo</h5>
            <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
            ></button>
        </div>
        <div class="offcanvas-body">
            <div class="list-group list-group-flush">
                <button
                    type="button"
                    class="list-group-item list-group-item-action"
                    aria-current="true"
                >
                    <router-link :to="{ name: 'home' }">Inicio</router-link>
                </button>
                <button
                    type="button"
                    class="list-group-item list-group-item-action"
                >
                    <router-link :to="{ name: 'drawflow' }"
                        >Nuevo programa</router-link
                    >
                </button>
                <button
                    type="button"
                    class="list-group-item list-group-item-action"
                >
                    <router-link :to="{ name: 'program' }">Listar</router-link>
                </button>
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
