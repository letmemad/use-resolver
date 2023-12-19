import React from "react";
import subscriber from "./subscriber";
function useResolver(key, promise, options, deps) {
    // References
    const isMounted = React.useRef(true);
    const isFirstRender = React.useRef(true);
    // Create the reducer
    const { state, dispatch } = subscriber.useState(key);
    // Function to resolve the promise
    const resolver = React.useCallback((revalidate) => {
        if (revalidate) {
            subscriber.mutate(key, { isLoading: true });
        }
        promise().then((data) => {
            subscriber.mutate(key, { isLoading: false, data });
            options?.onResolve && options.onResolve(data);
        }).catch((error) => {
            subscriber.mutate(key, { isLoading: false, error });
            options?.onError && options.onError(error);
        });
    }, [promise, deps, options]);
    // Function to revalidate the resolver
    function revalidate() {
        resolver(true);
    }
    // Function to change the data
    function mutate(set) {
        const payload = set(state.data);
        subscriber.mutate(key, { data: payload });
    }
    // Side effect to call the resolver when component mount.
    React.useEffect(() => {
        resolver(true);
    }, deps ?? []);
    // Main Side Effect
    React.useEffect(() => {
        isFirstRender.current = false;
        const unsubcribe = subscriber.subscribe(key, (state) => {
            if (isMounted.current == false) {
                return;
            }
            dispatch({ type: "CHANGE_STATE", payload: state });
        });
        return () => {
            unsubcribe();
            isMounted.current = false;
        };
    }, []);
    return ({ ...state, mutate, revalidate: revalidate });
}
function mutate(key, change) {
    const state = subscriber.getState(key);
    const updated = change(state.data);
    subscriber.mutate(key, { ...state, data: updated });
}
export default useResolver;
export { mutate };
