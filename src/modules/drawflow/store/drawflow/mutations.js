export const setEditor = (state, editor) => {
    state.editor = editor
}

export const setCodeViewer = (state) => {
    if (state.viewCode) {
        state.viewCode = false
    } else {
        state.viewCode = true
    }
}
