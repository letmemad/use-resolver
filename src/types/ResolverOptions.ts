export interface ResolverOptions<Data = any, Error = any> {
  /**
   * @description Callback to do something with data before it be resolved.
   */
  onResolve: (data: Data) => Data,

  /**
   * @description Callback to be executed when your resolver fail.
   * @returns void;
   */
  onError: () => Error | void;
}