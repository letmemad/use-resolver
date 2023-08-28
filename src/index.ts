import React from "react";
import reducer from "./store/reducer";
import { ReturnResolver } from "./types/ReturnResolver";
import { ResolverOptions } from "./types/ResolverOptions";

// Cache system
const Caching = new Map<string, ReturnType<typeof reducer<any, any>>>();

function useResolver<Data = any, Error = any>(
  key: string, 
  promise: () => Promise<Data>, 
  options?: ResolverOptions
): ReturnResolver<Data, Error> {

  // Get data from caching system
  const cache = Caching.get(key);

  // Create the reducer
  const [state, dispatch] = React.useReducer<typeof reducer<Data, Error>>(reducer, {
    data: cache?.data,
    error: cache?.error,
    isLoading: cache?.isLoading ?? true,
  });

  // Function to resolve the promise
  const resolver = React.useCallback((revalidate: boolean) => {
    if(revalidate) {
      dispatch({ type: "SET_LOADING", payload: true });
    }

    promise().then((data: Data) => {
      dispatch({ type: "SET_DATA", payload: data });
      options?.onResolve && options.onResolve();
    }).catch((error: Error) => {
      dispatch({ type: "SET_ERROR", payload: error });
      options?.onError && options.onError();
    });
  }, [promise, options])

  // Function to revalidate the resolver
  function revalidate() {
    resolver(true);
  }

  // Side effect to call the resolver when component mount.
  React.useMemo(() => {
    resolver(false);
  }, []);

  Caching.set(key, state);
  return ({ ...state, revalidate: revalidate });
}

export default useResolver;