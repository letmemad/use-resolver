import React from "react";
import reducer from "./reducer";

type State<Data = any, Error = any> = ReturnType<typeof reducer<Data, Error>>;

function createSubscriber() {
  const state = new Map<string, State>();
  const listeners = new Map<string, Function>();

  function getState<Data, Error>(key: string): State<Data, Error> {
    const values = state.get(key) as State<Data, Error>;
    return values;
  }

  function subscribe<Data, Error>(key: string, callback: (value: State<Data, Error>) => void) {
    listeners.set(key, callback);
    return () => { listeners.delete(key) }
  }

  function mutate<Data, Error>(key: string, values: Partial<State<Data, Error>>) {
    const old = getState<Data, Error>(key);
    const next = { ...old, ...values }

    state.set(key, next);
    listeners.forEach(callback => callback(next));
  }

  function useState<Data, Error>(key: string) {
    const cache = getState<Data, Error>(key);

    const initialValue = {
      isLoading: true,
      data: cache?.data,
      error: cache?.error,
    }

    const [values, dispatch] = React.useReducer<typeof reducer<Data, Error>>(reducer, initialValue);
    state.set(key, values);

    return { state: values, dispatch };
  }

  return { getState, subscribe, useState, mutate }
}

const subscriber = createSubscriber();
export default subscriber;