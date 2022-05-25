import store from '@/store'
import { actionHandler } from '../../handlers'

/**
 ** Event handler for the editor.
 */
export const events = () => {
    // Get the editor.
    const editor = store.getters['drawflowModule/getEditor']

    // Connection creation event.
    editor.on('connectionCreated', ({ output_id, input_id }) => {
        // Get the output and input nodes.
        const nodeOutput = editor.getNodeFromId(output_id)
        const nodeInput = editor.getNodeFromId(input_id)

        // Call the action handler.
        actionHandler(input_id, nodeOutput, nodeInput, editor)
    })

    editor.on('nodeDataChanged', (id) => {
        try {
            const nodeOutput = editor.getNodeFromId(id)
            const nodeInputId = nodeOutput.outputs.output_1.connections[0]

            if (nodeInputId) {
                const nodeInput = editor.getNodeFromId(nodeInputId.node)
                // Call the action handler.
                actionHandler(nodeInputId.node, nodeOutput, nodeInput, editor)
            }
        } catch (error) {
            console.log('')
        }

        // TODO: Actualizacion sencilla
    })

    editor.on('connectionRemoved', ({ input_id }) => {
        // Get the output and input nodes.
        //const nodeOutput = editor.getNodeFromId(output_id)
        // const nodeOutputData = nodeOutput.data
        // const nodeOutputName = nodeOutput.name

        const nodeInput = editor.getNodeFromId(input_id)
        // const nodeInputName = nodeInput.name
        // const nodeInputData = nodeInput.data

        if (nodeInput.name === 'assign') {
            const nodeOutput1 = nodeInput.outputs.output_1.connections[0]

            if (nodeOutput1) {
                editor.updateNodeDataFromId(nodeOutput1.node, {
                    value: 0,
                    code: '',
                })
            }

            editor.updateNodeDataFromId(input_id, {
                name: String(nodeInput.data.name),
                value: null,
                code: '',
            })
        }
        if (
            nodeInput.name === 'sum' ||
            nodeInput.name === 'subtract' ||
            nodeInput.name === 'multiply' ||
            nodeInput.name === 'divide'
        ) {
            editor.updateNodeDataFromId(input_id, {
                name: String(nodeInput.data.name),
                value: 0,
                code: '',
            })
        }
    })
}