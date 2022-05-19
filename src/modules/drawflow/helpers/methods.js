import store from '@/store'
import * as temp from './templates'

export const createNode = (name, posX, posY) => {
    const editor = store.getters['drawflowModule/getEditor']

    if (name == 'number') {
        editor.addNode(
            'number',
            0,
            1,
            posX,
            posY,
            'bg-primary',
            { name:'', val: 0 },
            temp.variableN
        )
    }
    if (name == 'string') {
        editor.addNode(
            'string',
            0,
            1,
            posX,
            posY,
            'bg-primary',
            { val: '' },
            temp.variableS
        )
    }
    if (name == 'bool') {
        editor.addNode(
            'bool',
            0,
            1,
            posX,
            posY,
            'bg-primary',
            { val: false },
            temp.variableB
        )
    }
    if (name == 'add') {
        editor.addNode(
            'add',
            2,
            1,
            posX,
            posY,
            'bg-warning',
            { name: '', val: 0 },
            temp.add
        )
    }
    if (name == 'subtract') {
        editor.addNode(
            'subtract',
            2,
            1,
            posX,
            posY,
            'bg-warning',
            { data: 0 },
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
            'bg-warning',
            { data: 0 },
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
            'bg-warning',
            { data: 0 },
            temp.divide
        )
    }
    if (name == 'if') {
        editor.addNode('if', 2, 2, posX, posY, 'bg-info', { data: 0 }, temp.ifT)
    }
    if (name == 'for') {
        editor.addNode(
            'for',
            1,
            1,
            posX,
            posY,
            'bg-info',
            { data: 0 },
            temp.forT
        )
    }
    if (name == 'assign') {
        editor.addNode(
            'assign',
            1,
            1,
            posX,
            posY,
            'bg-success',
            { name: '', val: ''},
            temp.assign
        )
    }
    if (name == 'print') {
        editor.addNode(
            'print',
            1,
            0,
            posX,
            posY,
            'bg-success',
            { data: 0 },
            temp.print
        )
    }
}
