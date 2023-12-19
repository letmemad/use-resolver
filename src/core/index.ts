import React, { DependencyList } from "react";

import subscriber from "./subscriber";
import { ReturnResolver } from "../types/ReturnResolver";
import { ResolverOptions } from "../types/ResolverOptions";

function useResolver<Data = any, Error = any>(
  key: string, 
  promise: () => Promise<Data>, 
  options?: Partial<ResolverOptions<Data, Error>>,
  deps?: DependencyList,
): ReturnResolver<Data, Error> {

  // References
  const isMounted = React.useRef(true);
  const isFirstRender = React.useRef(true);

  // Create the reducer
  const { state, dispatch } = subscriber.useState<Data, Error>(key);

  // Function to resolve the promise
  const resolver = React.useCallback((revalidate: boolean) => {
    if(revalidate) {
      subscriber.mutate(key, { isLoading: true });
    }

    promise().then((data: Data) => {
      subscriber.mutate(key, { isLoading: false, data });
      options?.onResolve && options.onResolve(data);
    }).catch((error: Error) => {
      subscriber.mutate(key, { isLoading: false, error });
      options?.onError && options.onError(error);
    });
  }, [promise, deps, options])

  // Function to revalidate the resolver
  function revalidate() {
    resolver(true);
  }

  // Function to change the data
  function mutate(set: (data: Data | undefined) => Data | undefined) {
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
      if(isMounted.current == false) {
        return;
      }

      dispatch({ type: "CHANGE_STATE", payload: state });
    });

    return () => {
      unsubcribe();
      isMounted.current = false;
    }
  }, []);

  return ({ ...state, mutate, revalidate: revalidate });
}

function mutate<Data = any>(key: string, change: (data: Data | undefined) => Partial<Data>) {
  const state = subscriber.getState<Data, any>(key);
  const updated = change(state.data);

  subscriber.mutate(key, { ...state, data: updated });
}

export default useResolver;
export { mutate };