import React from "react";
import reducer from "./reducer";
function createSubscriber() {
    const state = new Map();
    const listeners = new Map();
    function getState(key) {
        const values = state.get(key);
        return values;
    }
    function subscribe(key, callback) {
        listeners.set(key, callback);
        return () => { listeners.delete(key); };
    }
    function mutate(key, values) {
        const old = getState(key);
        const next = { ...old, ...values };
        state.set(key, next);
        listeners.forEach(callback => callback(next));
    }
    function useState(key) {
        const cache = getState(key);
        const initialValue = {
            isLoading: true,
            data: cache?.data,
            error: cache?.error,
        };
        const [values, dispatch] = React.useReducer(reducer, initialValue);
        state.set(key, values);
        return { state: values, dispatch };
    }
    return { getState, subscribe, useState, mutate };
}
const subscriber = createSubscriber();
export default subscriber;
