import { useCallback, useState } from 'react';

interface useJaeOMutationProps<TVariable, TData> {
  mutationFn: (variables: TVariable) => Promise<TData>;
  options?: {
    onSuccess: (result: TData) => void;
    onError: () => void;
  };
}

export const useJaeOMutation = <TVariable, TData>({
  mutationFn,
  options,
}: useJaeOMutationProps<TVariable, TData>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables: TVariable) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await mutationFn(variables);

        if (options?.onSuccess) options.onSuccess(result);

        return result;
      } catch (error) {
        setError(error as Error);

        if (options?.onError) options.onError();

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, options]
  );

  return { mutate, isLoading, error };
};
