export interface Action {
  payload: any;
  type: "CHANGE_STATE",
}

export interface State<Data = any, Error = any> {
  isLoading: boolean;
  data: Data | undefined;
  error: Error | undefined;
}

function reducer<D, E>(state: State, action: Action): State<D, E> {
  switch(action.type) {
    case "CHANGE_STATE": {
      const updated = action.payload;
      return updated;
    }

    default: {
      return state;
    };
  }
}

export default reducer;