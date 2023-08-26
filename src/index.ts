import React from "react";
import reducer from "./store/reducer";
import { FetcherOptions } from "./types/FetcherOptions";

function useFetcher<Data = any, Error = any>(key: string, promise: Promise<Data>, options?: FetcherOptions) {
  const [state, dispatch] = React.useReducer<typeof reducer<Data, Error>>(reducer, {
    [key]: {
      isLoading: true,
      data: undefined,
      error: undefined,
    }
  });

  function requester() {
    promise.then((data: Data) => {
      dispatch({ key, type: "SET_DATA", payload: data });
    }).catch((error: Error) => {
      dispatch({ key, type: "SET_ERROR", payload: error });
      options?.onError && options.onError();
    });
  }

  React.useEffect(() => requester(), []);

  return { ...state[key], revalidate: requester };
}

export default useFetcher;