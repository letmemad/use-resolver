function reducer(state, action) {
    switch (action.type) {
        case "CHANGE_STATE": {
            const updated = action.payload;
            return updated;
        }
        default:
            {
                return state;
            }
            ;
    }
}
export default reducer;
