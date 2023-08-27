export interface ResolverOptions {
  /**
   * @description Callback to be executed when resolve successfully
   * @returns void
   */
  onResolve: () => void,

  /**
   * @description Callback to be executed when your resolver fail.
   * @returns void;
   */
  onError: () => void;
}