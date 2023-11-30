function reducer(state, action) {
    switch (action.type) {
        case "SET_LOADING": {
            const isLoading = action.payload;
            return ({ ...state, isLoading });
        }
        case "SET_DATA": {
            const data = action.payload;
            return ({ ...state, data, isLoading: false, error: undefined });
        }
        case "SET_ERROR": {
            const error = action.payload;
            return ({ ...state, error, isLoading: false, data: undefined });
        }
        default: return state;
    }
}
export default reducer;
