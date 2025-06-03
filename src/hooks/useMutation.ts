import { useState, useCallback } from 'react';

interface MutationResult<T, V> {
  mutate: (vars: V) => Promise<T>;
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useMutation<T, V>(fn: (vars: V) => Promise<T>): MutationResult<T, V> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (vars: V) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fn(vars);
        setData(response);
        return response;
      } catch (err) {
        const thrown = err instanceof Error ? err : new Error(String(err));
        setError(thrown);
        throw thrown;
      } finally {
        setIsLoading(false);
      }
    },
    [fn]
  );

  return { mutate, data, isLoading, error };
}
