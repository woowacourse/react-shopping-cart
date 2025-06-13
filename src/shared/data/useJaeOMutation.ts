import { useCallback, useState } from 'react';

interface UseJaeOMutationOptions<TVariable, TData> {
  mutationFn: (variables: TVariable) => Promise<TData>;
  onSuccess?: (result: TData) => void;
  onError?: () => void;
}

export function useJaeOMutation<TVariable, TData>({
  mutationFn,
  onSuccess,
  onError,
}: UseJaeOMutationOptions<TVariable, TData>) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables: TVariable) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await mutationFn(variables);

        onSuccess?.(result);

        return result;
      } catch (error) {
        setError(error as Error);

        onError?.();

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, onSuccess, onError]
  );

  return { mutate, isLoading, error };
}
