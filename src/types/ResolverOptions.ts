export interface ResolverOptions<Data = any, Error = any> {
  /**
   * @description A boolean to know when page is focused.
   */
  isFocused?: boolean;

  /**
   * @description A boolean to refresh the data when page get focused.
   */
  refreshWhenFocus?: boolean;

  /**
   * @description Callback to do something with data before it be resolved.
   */
  onResolve?: (data: Data) => Data,

  /**
   * @description Callback to be executed when your resolver fail.
   * @returns void;
   */
  onError?: (error: Error | string) => Error | void;
}