import { DependencyList } from "react";
import { ReturnResolver } from "./types/ReturnResolver";
import { ResolverOptions } from "./types/ResolverOptions";
declare function useResolver<Data = any, Error = any>(key: string, promise: () => Promise<Data>, options?: ResolverOptions, dependencies?: DependencyList): ReturnResolver<Data, Error>;
export default useResolver;
