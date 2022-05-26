export const setSidebar = (state) => {
    if (state.sidebar) {
        state.sidebar = false
    } else {
        state.sidebar = true
    }
}
