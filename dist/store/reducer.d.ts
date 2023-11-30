export interface Action {
    payload: any;
    type: "SET_LOADING" | "SET_DATA" | "SET_ERROR";
}
export interface State<Data = any, Error = any> {
    isLoading: boolean;
    data: Data | undefined;
    error: Error | undefined;
}
declare function reducer<D, E>(state: State, action: Action): State<D, E>;
export default reducer;
