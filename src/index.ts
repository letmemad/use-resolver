import React from "react";
import reducer from "./store/reducer";
import { FetcherOptions } from "./types/FetcherOptions";

const Caching = new Map();

function useFetcher<Data = any, Error = any>(key: string, promise: Promise<Data>, options?: FetcherOptions) {
  const cache = Caching.get(key);

  const [state, dispatch] = React.useReducer<typeof reducer<Data, Error>>(reducer, {
    data: cache?.data ?? undefined,
    error: cache?.error ?? undefined,
    isLoading: cache?.isLoading ?? true,
  });

  function requester() {
    dispatch({ type: "SET_LOADING", payload: true });

    promise.then((data: Data) => {
      dispatch({ type: "SET_DATA", payload: data });
    }).catch((error: Error) => {
      dispatch({ type: "SET_ERROR", payload: error });
      options?.onError && options.onError();
    });
  }

  React.useEffect(() => {
    requester();
  }, []);

  Caching.set(key, state);
  return ({ ...state, revalidate: requester });
}

export default useFetcher;