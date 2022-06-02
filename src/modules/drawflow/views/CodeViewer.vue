<template>
    <div class="main m-3 d-flex flex-column">
        <div>
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
                </div>
            </div>
            <div class="mx-3 px-3 viewer">
                <pre class="code">{{ getProgramCode }}</pre>
            </div>
            <div v-if="initExecution" class="console mx-3">
                <div class="p-auto">
                    <h5><i>Consola</i></h5>
                    <h6 class="">----- Inicio de la ejecucion -----</h6>
                    <div class="execution">
                        <pre class="fs-5">{{ execution }}</pre>
                    </div>
                    <h6 v-if="finalExecution">
                        ----- Ejecucion realizada con exito -----
                    </h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api'
import { mapGetters } from 'vuex'
import { programsEndpoint } from '@/api/endpoints'
export default {
    name: 'codeViewer',
    props: {
        uid: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            execution: '',
            initExecution: false,
            finalExecution: false,
        }
    },
    computed: {
        ...mapGetters('drawflowModule', ['getProgramCode']),
    },
    methods: {
        async generatePy() {
            try {
                this.initExecution = true
                const { data } = await api.post(
                    `${programsEndpoint}/${this.uid}/execute-program`,
                    this.getProgramCode
                )
                this.execution = data
                this.finalExecution = true
            } catch (error) {
                this.execution = 'Error de Ejecucion'
                console.log(error)
            }
        },
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
    font-size: large;
}

.console {
    // position: absolute;
    // top: 40px; left: 40px;
    border: 2px solid #bebaba;
    border-radius: 10px;
    background-color: #cde5e5;
    height: 180px;
    margin-top: 12px;
}
.viewer {
    background-color: #bfbcbc1a;
    height: 550px;
    overflow-x: hidden;
    overflow-y: auto;
    border-radius: 10px;
}

.execution {
    height: 90px;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>
