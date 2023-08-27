import { FetcherOptions } from "./types/FetcherOptions";
export { FetcherOptions } from "./types/FetcherOptions";

export default function useFetcher<Data = any, Error = any>(key: string, promise: Promise<any>, options?: FetcherOptions): {
  isLoading: boolean;
  data: Data | undefined;
  error: Error | undefined;
  revalidate: () => void;
}