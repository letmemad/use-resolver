export interface ReturnResolver<Data, Error> {
  isLoading: boolean;
  data: Data | undefined
  error: Error | undefined;
  revalidate(): void;
}