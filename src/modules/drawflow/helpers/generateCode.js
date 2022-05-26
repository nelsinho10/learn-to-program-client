const blocks = (nodes) => {
    let blocks = []
    nodes.forEach((node) => {
        if (node.name === 'block') {
            blocks.push({
                id: node.id,
                comment: node.data.code,
            })
        }
    })
    return blocks
}

const blocksS = (nodes) => {
    let blocks = []
    nodes.forEach((node) => {
        if (node.name === 'blockS') {
            blocks.push({
                id: node.data.blockId,
                comment: node.data.code,
                isTrue: node.data.isTrue,
            })
        }
    })
    return blocks
}

export const generateCode = (nodes) => {
    let codeProgram = ''
    const codeArray = []
    const structBlocks = blocksS(nodes)
    const generalBlocks = blocks(nodes)

    generalBlocks.forEach(({ id, comment }) => {
        codeProgram = codeProgram.concat('\n', comment)
        nodes.forEach((node) => {
            // Validate if the node is a block
            if (node.data.blockId === id) {
                const name = node.name

                if (name === 'assign' || name === 'print') {
                    codeProgram = codeProgram.concat('\n', node.data.code)
                }

                if (name === 'for') {
                    codeProgram = codeProgram.concat('\n', node.data.code)
                    structBlocks.forEach(({ id, comment }) => {
                        if (node.id === id) {
                            codeProgram = codeProgram.concat('\n   ', comment)

                            nodes.forEach((subNode) => {
                                if (subNode.data.blockId === id) {
                                    if (
                                        subNode.name === 'assign' ||
                                        subNode.name === 'print'
                                    ) {
                                        codeProgram = codeProgram.concat(
                                            '\n   ',
                                            subNode.data.code
                                        )
                                    }
                                }
                            })
                        }
                    })
                }

                if (name === 'if') {
                    codeProgram = codeProgram.concat('\n', node.data.code)
                    structBlocks.forEach(({ id, comment, isTrue }) => {
                        if (node.id === id && isTrue) {
                            codeProgram = codeProgram.concat('\n   ', comment)

                            nodes.forEach((subNode) => {
                                if (
                                    subNode.data.blockId === id &&
                                    subNode.data.isTrue === true
                                ) {
                                    if (
                                        subNode.name === 'assign' ||
                                        subNode.name === 'print'
                                    ) {
                                        codeProgram = codeProgram.concat(
                                            '\n   ',
                                            subNode.data.code
                                        )
                                    }
                                }
                            })
                        }
                    })
                    codeProgram = codeProgram.concat('\n', 'else:')
                    structBlocks.forEach(({ id, comment, isTrue }) => {
                        if (node.id === id && !isTrue) {
                            codeProgram = codeProgram.concat('\n   ', comment)
                            codeArray.push('\n   ', comment)

                            nodes.forEach((subNode) => {
                                if (
                                    subNode.data.blockId === id &&
                                    subNode.data.isTrue === false
                                ) {
                                    if (
                                        subNode.name === 'assign' ||
                                        subNode.name === 'print'
                                    ) {
                                        codeProgram = codeProgram.concat(
                                            '\n   ',
                                            subNode.data.code
                                        )
                                        codeArray.push(
                                            '\n   ',
                                            subNode.data.code
                                        )
                                    }
                                }
                            })
                        }
                    })
                }
            }
        })
    })

    console.log(codeProgram)
    return codeProgram
}
