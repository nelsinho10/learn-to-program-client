import { createStore } from 'vuex'

import drawflowModule from '../modules/drawflow/store/drawflow'
import sharedModule from '../modules/shared/store/shared'

const store = createStore({
    modules: {
        drawflowModule,
        sharedModule,
    },
})

export default store
