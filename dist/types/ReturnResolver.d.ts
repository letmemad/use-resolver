export interface ReturnResolver<Data, Error> {
    isLoading: boolean;
    data: Data | undefined;
    error: Error | undefined;
    revalidate(): void;
    mutate(set: (data: Data | undefined) => Data | undefined): void;
}
