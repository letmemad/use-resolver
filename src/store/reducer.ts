export interface Action {
  key: string;
  payload: any;
  type: "SET_LOADING" | "SET_DATA" | "SET_ERROR",
}

export interface State<Data = any, Error = any> {
  [key: string]: {
    isLoading: boolean;
    data: Data | undefined;
    error: Error | undefined;
  }
}

function reducer<D, E>(state: State, action: Action): State<D, E> {
  const key = action.key;
  const value = state[key];

  switch(action.type) {
    case "SET_LOADING": {
      value.isLoading = action.payload;
      return ({ ...state, [key]: value });
    }

    case "SET_DATA": {
      value.isLoading = false;
      value.data = action.payload;
      return ({ ...state, [key]: value });
    }

    case "SET_ERROR": {
      value.isLoading = false;
      value.data = undefined;
      value.error = action.payload;

      return ({ ...state, [key]: value });
    }

    default: return state;
  }
}

export default reducer;