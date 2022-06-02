// Create array of blocks
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

// Create array of blocks struct
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

// Generate code for the fors
const generateForCode = (nodes, idFor) => {
    const structBlocks = blocksS(nodes)
    let forCode = ''
    structBlocks.forEach(({ id, comment }) => {
        if (idFor === id) {
            forCode = forCode.concat('   ', comment)
            nodes.forEach((subNode) => {
                if (subNode.data.blockId === id) {
                    if (subNode.name === 'assign' || subNode.name === 'print') {
                        forCode = forCode.concat('\n   ', subNode.data.code)
                    }
                }
            })
        }
    })

    return forCode
}

// Generate code for the ifs
const generateIfCode = (nodes, idIf) => {
    const structBlocks = blocksS(nodes)
    let ifCode = ''
    structBlocks.forEach(({ id, comment, isTrue }) => {
        if (idIf === id && isTrue) {
            ifCode = ifCode.concat('   ', comment)
            nodes.forEach((subNode) => {
                if (
                    subNode.data.blockId === id &&
                    subNode.data.isTrue === true
                ) {
                    if (subNode.name === 'assign' || subNode.name === 'print') {
                        ifCode = ifCode.concat('\n   ', subNode.data.code)
                    }
                }
            })
        }
    })
    ifCode = ifCode.concat('\n', 'else:')
    structBlocks.forEach(({ id, comment, isTrue }) => {
        if (idIf === id && !isTrue) {
            ifCode = ifCode.concat('\n   ', comment)

            nodes.forEach((subNode) => {
                if (
                    subNode.data.blockId === id &&
                    subNode.data.isTrue === false
                ) {
                    if (subNode.name === 'assign' || subNode.name === 'print') {
                        ifCode = ifCode.concat('\n   ', subNode.data.code)
                    }
                }
            })
        }
    })
    return ifCode
}

// Generate code for the blocks
const blockCode = (nodes, id) => {
    let code = ''

    nodes.forEach((node) => {
        if (node.data.blockId === id) {
            const name = node.name

            if (name === 'assign' || name === 'print') {
                code = code.concat('\n', node.data.code)
            }
            if (name === 'for') {
                code = code.concat('\n', node.data.code)
                code = code.concat('\n', generateForCode(nodes, node.id))
            }
            if (name === 'if') {
                code = code.concat('\n', node.data.code)
                code = code.concat('\n', generateIfCode(nodes, node.id))
            }
        }
    })

    return code
}

// Generate code from nodes
export const generateCode = (nodes) => {
    let codeProgram = ''

    const generalBlocks = blocks(nodes)

    generalBlocks.forEach(({ id, comment }) => {
        codeProgram = codeProgram.concat('\n\n', comment)
        codeProgram = codeProgram.concat(blockCode(nodes, id))
    })

    return codeProgram
}
