export const actionHandler = (input_id, nodeOutput, nodeInput, editor) => {
    const nodeOutputName = nodeOutput.name
    const nodeOutputData = nodeOutput.data
    const nodeInputName = nodeInput.name
    const nodeInputData = nodeInput.data

    // Outputs
    if (nodeOutputName === 'block') {
        editor.updateNodeDataFromId(input_id, {
            ...nodeInputData,
            blockId: nodeOutput.id,
        })
        editor.updateNodeDataFromId(nodeOutput.id, {
            ...nodeOutputData,
            code: `# ${nodeOutputData.comment}`,
            blockId: nodeOutput.id,
        })
    }

    if (nodeOutputName === 'blockS') {
        editor.updateNodeDataFromId(nodeOutput.id, {
            ...nodeOutputData,
            code: `# ${nodeOutputData.comment}`,
        })
    }

    if (nodeOutputName === 'string') {
        editor.updateNodeDataFromId(input_id, {
            name: String(nodeInputData.name),
            value: nodeOutputData.value,
            code: `${String(nodeInputData.name)} = '${nodeOutputData.value}'`,
            blockId: nodeOutputData.blockId,
            isTrue: nodeOutputData.isTrue,
        })
    }
    if (nodeOutputName === 'bool' || nodeOutputName === 'number') {
        editor.updateNodeDataFromId(input_id, {
            name: String(nodeInputData.name),
            value: nodeOutputData.value,
            code: `${String(nodeInputData.name)} = ${nodeOutputData.value}`,
            blockId: nodeOutputData.blockId,
            isTrue: nodeOutputData.isTrue,
        })
    }

    if (nodeOutputName === 'if') {
        const nodeOutput1Id = nodeOutput.outputs.output_1.connections[0]
        const nodeOutput2Id = nodeOutput.outputs.output_2.connections[0]

        if (nodeOutput1Id && nodeOutput2Id) {
            const nodeOutput1 = editor.getNodeFromId(nodeOutput1Id.node)
            const nodeOutput2 = editor.getNodeFromId(nodeOutput2Id.node)

            editor.updateNodeDataFromId(nodeOutput1Id.node, {
                ...nodeOutput1.data,
                isTrue: true,
                blockId: nodeOutput.id,
            })
            editor.updateNodeDataFromId(nodeOutput2Id.node, {
                ...nodeOutput2.data,
                isTrue: false,
                blockId: nodeOutput.id,
            })
        }
    }

    if (nodeOutputName === 'for') {
        editor.updateNodeDataFromId(input_id, {
            ...nodeInputData,
            isTrue: nodeOutputData.isTrue,
            blockId: nodeOutput.id,
        })
    }

    if (
        nodeOutputName === 'sum' ||
        nodeOutputName === 'subtract' ||
        nodeOutputName === 'multiply' ||
        nodeOutputName === 'divide'
    ) {
        editor.updateNodeDataFromId(input_id, {
            name: String(nodeInputData.name),
            value: nodeOutputData.value,
            code: `${String(nodeInputData.name)} = ${nodeOutputData.code}`,
            blockId: nodeOutputData.blockId,
            isTrue: nodeOutputData.isTrue,
        })
    }

    // Inputs
    if (nodeInputName === 'blockS') {
        editor.updateNodeDataFromId(input_id, {
            ...nodeInputData,
            code: `# ${nodeInputData.comment}`,
            blockId: nodeOutput.id,
            isTrue: nodeOutputData.isTrue || false,
        })
    }

    if (
        nodeInputName === 'number' ||
        nodeInputName === 'bool' ||
        nodeInputName === 'string'
    ) {
        editor.updateNodeDataFromId(nodeInput.id, {
            ...nodeInputData,
            isTrue: nodeOutputData.isTrue,
            blockId:
                nodeOutputName === 'block'
                    ? nodeOutput.id
                    : nodeOutputData.blockId,
        })
    }

    if (nodeInputName === 'print') {
        const blockId =
            nodeOutputData.blockId === null
                ? nodeOutput.id
                : nodeOutputData.blockId

        if (nodeOutputName === 'assign') {
            editor.updateNodeDataFromId(input_id, {
                ...nodeInputData,
                code: `print('${nodeInputData.data}' % ${nodeOutputData.name} )`,
                blockId,
                isTrue: nodeOutputData.isTrue,
            })
        } else {
            editor.updateNodeDataFromId(input_id, {
                ...nodeInputData,
                code: `print('${nodeInputData.data}')`,
                blockId,
                isTrue: nodeOutputData.isTrue,
            })
        }
    }

    if (nodeInputName === 'if') {
        const nodeInput1Id = nodeInput.inputs.input_1.connections[0]
        const nodeInput2Id = nodeInput.inputs.input_2.connections[0]

        if (nodeInput1Id && nodeInput2Id) {
            const nodeInput1 = editor.getNodeFromId(nodeInput1Id.node)
            const nodeInput2 = editor.getNodeFromId(nodeInput2Id.node)

            const val1 =
                nodeInput1.name !== 'string'
                    ? nodeInput1.data.value
                    : `'${nodeInput1.data.value}'`

            const val2 =
                nodeInput2.name !== 'string'
                    ? nodeInput2.data.value
                    : `'${nodeInput2.data.value}'`

            const condition = `${val1} ${nodeInput.data.operator} ${val2}`

            editor.updateNodeDataFromId(input_id, {
                ...nodeInputData,
                condition,
                code: `if ${condition}:`,
                blockId: nodeOutput.data.blockId,
            })
        }
    }

    if (
        nodeInputName === 'sum' ||
        nodeInputName === 'subtract' ||
        nodeInputName === 'multiply' ||
        nodeInputName === 'divide'
    ) {
        mathOperation(editor, nodeInput, nodeInputName)
    }

    if (nodeInputName === 'for') {
        const blockId =
            nodeOutputData.blockId === null
                ? nodeOutput.id
                : nodeOutputData.blockId

        editor.updateNodeDataFromId(input_id, {
            ...nodeInputData,
            code: `for i in range(${nodeInputData.val1}, ${nodeInputData.val2}):`,
            blockId,
            isTrue: nodeOutputData.isTrue,
        })
    }
}

const mathOperation = (editor, nodeInput, operation) => {
    let code = ''
    const nodeToChange = nodeInput
    const node1 = nodeToChange.inputs.input_1.connections[0]
    const node2 = nodeToChange.inputs.input_2.connections[0]

    if (node1 && node2) {
        const nodeName1 = editor.getNodeFromId(node1.node).data.name
        const nodeName2 = editor.getNodeFromId(node2.node).data.name

        const { newValue, val1, val2, operator } = mathHandler(
            node1,
            node2,
            editor,
            operation
        )
        code = `${val1} ${operator} ${val2}`

        if (nodeName1 && nodeName2) {
            code = `${nodeName1} ${operator} ${nodeName2}`
        } else {
            if (nodeName1) {
                code = `${nodeName1} ${operator} ${val2}`
            }

            if (nodeName2) {
                code = `${val1} ${operator} ${nodeName2}`
            }
        }

        editor.updateNodeDataFromId(nodeToChange.id, {
            value: newValue,
            code,
            blockId: editor.getNodeFromId(node1.node).data.blockId,
            isTrue: editor.getNodeFromId(node1.node).data.isTrue,
        })
    }
}

const mathHandler = (node1, node2, editor, operation) => {
    let newValue = 0
    let val1 = 0
    let val2 = 0
    let operator = ''

    if (node1) {
        const id = node1.node
        val1 = Number(editor.getNodeFromId(id).data.value)
        newValue = val1
    }

    if (node2) {
        const id = node2.node
        val2 = Number(editor.getNodeFromId(id).data.value)

        if (operation === 'sum') {
            newValue += val2
            operator = '+'
        }
        if (operation === 'subtract') {
            newValue -= val2
            operator = '-'
        }
        if (operation === 'multiply') {
            newValue *= val2
            operator = '*'
        }
        if (operation === 'divide') {
            newValue /= val2
            operator = '/'
        }
    }

    return { newValue, val1, val2, operator }
}
