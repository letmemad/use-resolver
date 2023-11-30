import { DependencyList } from "react";
import { ReturnResolver } from "./types/ReturnResolver";
import { ResolverOptions } from "./types/ResolverOptions";
declare function useResolver<Data = any, Error = any>(key: string, promise: () => Promise<Data>, options?: Partial<ResolverOptions<Data, Error>>, deps?: DependencyList): ReturnResolver<Data, Error>;
export default useResolver;
