export const variableS = `
        <div>
            <p class="text-light">Cadena</p>
            <input type="text" class="form-control" df-val>
        </div>
        `
export const variableN = `
        <div>
            <p class="text-light">Numero</p>
            <input type="number" class="form-control" df-val>
        </div>
        `
export const variableB = `
        <div>
            <p class="text-light">Booleano</p>
            <select class="form-select" df-val>
                <option value="true">True</option>
                <option value="false">False</option>
            </select>
        </div>
        `
export const assign = `
        <div>
            <p class="text-light">Asignar</p>
            <input type="text" class="form-control" df-name>
        </div>
        `
export const add = `
        <div>
            <p class="text-">Suma</p>
            <input type="number" class="form-control" df-val>
        </div>
        `
export const subtract = `
        <div>
            <p class="text-">Resta</p>
            <input type="number" class="form-control">
        </div>
        `
export const multiply = `
        <div>
            <p class="text-">Multiplicacion</p>
            <input type="number" class="form-control">
        </div>
        `
export const divide = `
        <div>
            <p class="text-">Divsion</p>
            <input type="number" class="form-control">
        </div>
        `
export const print = `
        <div>
            <p class="text-light">Impresion</p>
            <input type="text" class="form-control">
        </div>
        `
export const ifT = `
        <div>
            <p class="text-">Desicion</p>
            <select class="form-select" df-data>
                <option value="">mayor que ">"</option>
            </select>
        </div>
        `
export const forT = `
        <div>
            <p class="text-">Repeticion</p>
            <input type="text" class="form-control">
        </div>
        `

export const dataType = [
    { nameNode: 'Numerico', dataNode: 'number' },
    { nameNode: 'Cadena', dataNode: 'string' },
    { nameNode: 'Booleano', dataNode: 'bool' },
]

export const operationsNodes = [
    { nameNode: 'Suma', dataNode: 'add' },
    { nameNode: 'Resta', dataNode: 'subtract' },
    { nameNode: 'Multiplicacion', dataNode: 'multiply' },
    { nameNode: 'Division', dataNode: 'divide' },
]

export const controlStructuresNodes = [
    { nameNode: 'Desicion', dataNode: 'if' },
    { nameNode: 'Repeticion', dataNode: 'for' },
]

export const funcsNodes = [
    { nameNode: 'Asignacion', dataNode: 'assign' },
    { nameNode: 'Impresion', dataNode: 'print' },
]


