import { ResolverOptions } from "./types/ResolverOptions";

export { ResolverOptions }
export default function useFetcher<Data = any, Error = any>(
  key: string, 
  promise: () => Promise<any>,
  options?: Partial<ResolverOptions>
): {
  isLoading: boolean;
  data: Data | undefined;
  error: Error | undefined;
  revalidate: () => void;
}