export interface Action {
    payload: any;
    type: "CHANGE_STATE";
}
export interface State<Data = any, Error = any> {
    isLoading: boolean;
    data: Data | undefined;
    error: Error | undefined;
}
declare function reducer<D, E>(state: State, action: Action): State<D, E>;
export default reducer;
