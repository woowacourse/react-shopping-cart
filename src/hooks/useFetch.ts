import { useState, useEffect, useCallback } from "react";

interface UseFetchOptions {
  immediate?: boolean; // 즉시 실행할지 여부
}

interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | undefined;
  refetch: () => Promise<void>;
}

export function useFetch<T>(
  fetcher: () => Promise<T>,
  options: UseFetchOptions = { immediate: true }
): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, [execute, options.immediate]);

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
}
