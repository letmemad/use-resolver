import { ResolverOptions } from "./types/ResolverOptions";
import { ReturnResolver } from "./types/ReturnResolver";

export { ResolverOptions, ReturnResolver }
export default function useResolver<Data, Error = any>(
  key: string, 
  promise: () => Promise<Data>,
  options?: Partial<ResolverOptions>
): ReturnResolver<Data, Error>;