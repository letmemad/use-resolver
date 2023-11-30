import React from "react";
import reducer from "./store/reducer";
// Cache system
const Caching = new Map();
function useResolver(key, promise, options, deps) {
    // Get data from caching system
    const cache = Caching.get(key);
    // Create the reducer
    const [state, dispatch] = React.useReducer(reducer, {
        data: cache?.data,
        error: cache?.error,
        isLoading: true,
    });
    // Function to resolve the promise
    const resolver = React.useCallback((revalidate) => {
        if (revalidate) {
            dispatch({ type: "SET_LOADING", payload: true });
        }
        promise().then((data) => {
            if (options?.onResolve) {
                data = options.onResolve(data);
            }
            dispatch({ type: "SET_DATA", payload: data });
        }).catch((error) => {
            dispatch({ type: "SET_ERROR", payload: error });
            options?.onError && options.onError(error);
        });
    }, [promise, options]);
    // Function to revalidate the resolver
    function revalidate() {
        resolver(true);
    }
    // Function to change the data
    function mutate(set) {
        const payload = set(state.data);
        dispatch({ type: "SET_DATA", payload });
    }
    // Side effect to call the resolver when component mount.
    React.useEffect(() => {
        resolver(false);
    }, deps ?? []);
    Caching.set(key, state);
    return ({ ...state, mutate, revalidate: revalidate });
}
export default useResolver;
