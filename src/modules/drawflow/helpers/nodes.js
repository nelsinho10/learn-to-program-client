import store from '@/store'
import * as temp from './templates'

export const createNode = (name, posX, posY) => {
    const editor = store.getters['drawflowModule/getEditor']

    if (name == 'assign') {
        editor.addNode(
            'assign',
            1,
            1,
            posX,
            posY,
            'bg-success',
            { name: '', value: null, code: '', blockId: null, isTrue: null },
            temp.assign
        )
    }

    if (name == 'number') {
        editor.addNode(
            'number',
            1,
            1,
            posX,
            posY,
            'bg-primary',
            { name: '', value: 0, blockId: null, isTrue: null },
            temp.variableN
        )
    }
    if (name == 'string') {
        editor.addNode(
            'string',
            1,
            1,
            posX,
            posY,
            'string',
            { name: 'string', value: '', blockId: null, isTrue: null },
            temp.variableS
        )
    }
    if (name == 'bool') {
        editor.addNode(
            'bool',
            1,
            1,
            posX,
            posY,
            'bool',
            { name: '', value: 'False', blockId: null, isTrue: null },
            temp.variableB
        )
    }
    if (name == 'sum') {
        editor.addNode(
            'sum',
            2,
            1,
            posX,
            posY,
            'bg-warning',
            { name: '', value: 0, code: '', blockId: null, isTrue: null },
            temp.sum
        )
    }
    if (name == 'subtract') {
        editor.addNode(
            'subtract',
            2,
            1,
            posX,
            posY,
            'subtract',
            { data: 0, blockId: null, isTrue: null },
            temp.subtract
        )
    }
    if (name == 'multiply') {
        editor.addNode(
            'multiply',
            2,
            1,
            posX,
            posY,
            'multiply',
            { data: 0, blockId: null, isTrue: null },
            temp.multiply
        )
    }
    if (name == 'divide') {
        editor.addNode(
            'divide',
            2,
            1,
            posX,
            posY,
            'divide',
            { data: 0, blockId: null, isTrue: null },
            temp.divide
        )
    }
    if (name == 'if') {
        editor.addNode(
            'if',
            2,
            2,
            posX,
            posY,
            'bg-info decision',
            {
                operator: '',
                val1: null,
                val1Bool: true,
                val2: null,
                val2Bool: false,
                code: '',
                blockId: null,
            },
            temp.ifT
        )
    }
    if (name == 'for') {
        editor.addNode(
            'for',
            1,
            1,
            posX,
            posY,
            'bg-info repetition',
            {
                val1: 0,
                val2: 0,
                blockId: null,
                isTrue: null,
                code: '',
            },
            temp.forT
        )
    }

    if (name == 'print') {
        editor.addNode(
            'print',
            1,
            0,
            posX,
            posY,
            'print',
            { data: '', blockId: null, code: '', isTrue: null },
            temp.print
        )
    }

    if (name == 'block') {
        editor.addNode(
            'block',
            0,
            1,
            posX,
            posY,
            'bg-secondary',
            { code: '', comment: '', blockId: null },
            temp.block
        )
    }
    if (name == 'blockS') {
        editor.addNode(
            'blockS',
            1,
            1,
            posX,
            posY,
            'block',
            { code: '', comment: '', isTrue: null, blockId: null },
            temp.block
        )
    }
}
