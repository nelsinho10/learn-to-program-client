<template>
    <div class="main m-3">
        <div class="m-3 d-flex justify-content-between">
            <p><i> programa.py </i></p>
            <div>
                <button
                    @click="generatePy"
                    type="button"
                    class="btn btn-primary btn-sm mx-2"
                >
                    Ejecutar
                </button>
                <button type="button" class="btn btn-secondary btn-sm">
                    Descargar
                </button>
            </div>
        </div>
        <div>
            <div class="mx-3 my-1 p-3">
                <pre class="m-0"># Variables</pre>
                <p class="code" v-for="(code, index) in codes" :key="index">
                    {{ code }}
                </p>
            </div>
            <div class="mx-3 p-3">
                <pre class="m-0"># Prints</pre>
                <p class="code" v-for="(code, index) in codes" :key="index">
                    {{ code }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'codeViewer',
    data() {
        return {
            codes: ['hola1 = 2', 's = "mundo"'],
        }
    },
    methods: {
        generatePy() {},
    },
}
</script>

<style lang="scss" scoped>
.main {
    height: 100%;
    border: 2px solid #d1cfcf;
    border-radius: 8px;
    font-size: x-large;
}

.code {
    padding: 0;
    margin: 2px;
}
</style>
