export interface FetcherOptions {
  /**
   * It inidicates if the user is online or not.
   */
  isOnline: boolean | Function<boolean>;

  /**
   * Callback to be executed when your request fail.
   */
  onError: Function<void>;
}