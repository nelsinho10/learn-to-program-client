export const block = `
        <div>
            <p class="text-light">Bloque</p>
            <textarea class="form-control" rows="4" df-comment></textarea>
        </div>
        `
export const variableS = `
        <div>
            <p class="text-light">Cadena</p>
            <textarea class="form-control" rows="2" df-value></textarea>
        </div>
        `
export const variableN = `
        <div>
            <p class="text-light">Numero</p>
            <input type="number" class="form-control" df-value>
        </div>
        `
export const variableB = `
        <div>
            <p class="text-light">Booleano</p>
            <select class="form-select" df-value>
                <option value="True">Verdadero</option>
                <option value="False">Falso</option>
            </select>
        </div>
        `
export const assign = `
        <div>
            <p class="text-light">Asignar</p>
            <input type="text" class="form-control" df-name>
        </div>
        `
export const sum = `
        <div>
            <p class="text-">Suma</p>
            <input type="number" class="form-control" df-value readonly>
        </div>
        `
export const subtract = `
        <div>
            <p class="text-">Resta</p>
            <input type="number" class="form-control" df-value readonly> 
        </div>
        `
export const multiply = `
        <div>
            <p class="text-">Multiplicacion</p>
            <input type="number" class="form-control" df-value readonly>
        </div>
        `
export const divide = `
        <div>
            <p class="text-">Divsion</p>
            <input type="number" class="form-control" df-value readonly>
        </div>
        `
export const print = `
        <div>
            <p class="text-light">Impresion</p>
            <textarea class="form-control" rows="3" df-data></textarea>
        </div>
        `
export const ifT = `
        <div>
            <p class="text-">Desicion</p>
            <small>Operador</small>
            <select class="form-select mb-3" style="text-align:center;" df-operator>
            <option value=">"> > </option>
            <option value="<"> < </option>
            <option value="=="> == </option>
                <option value=">="> >= </option>
                <option value="<="> <= </option>
            </select>
            <small>Condicion</small>
            <input type="text" class="form-control" df-condition style="text-align:center;" readonly>
        </div>
        `
export const forT = `
        <div>
            <p class="text-">Repeticion</p>
            <small>Desde</small>
            <input type="number" class="form-control" df-val1>
            <small>Hasta</small>
            <input type="number" class="form-control" df-val2>
        </div>
        `
