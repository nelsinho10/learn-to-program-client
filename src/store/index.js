import { createStore } from 'vuex'
import drawflowModule from '../modules/drawflow/store/drawflow'

const store = createStore({
    modules: {
        drawflowModule,
    },
})

export default store
