import { useEffect, useCallback, useRef, useState } from "react";

interface FetchOptions {
  autoFetch?: boolean;
  deps?: unknown[];
}

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDataFetch<T>(
  fetcher: (() => Promise<T>) | null,
  options: FetchOptions = {}
): FetchResult<T> {
  const { autoFetch = true, deps = [] } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const prevDepsRef = useRef<unknown[] | null>(null);

  const depsChanged = useCallback(() => {
    const currentDeps = deps;
    const prevDeps = prevDepsRef.current;

    if (prevDeps === null) {
      return true;
    }

    if (currentDeps.length !== prevDeps.length) {
      return true;
    }

    for (let i = 0; i < currentDeps.length; i++) {
      if (currentDeps[i] !== prevDeps[i]) {
        return true;
      }
    }

    return false;
  }, [deps]);

  const executeFetch = useCallback(async (): Promise<void> => {
    if (!fetcher) return;

    try {
      setLoading(true);
      setError(null);

      const result = await fetcher();
      setData(result);
    } catch (error) {
      console.error(`[useDataFetch] 에러 발생:`, error);

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    if (!autoFetch || !fetcher) {
      return;
    }

    const shouldFetch = depsChanged();

    if (shouldFetch) {
      prevDepsRef.current = [...deps];
      executeFetch();
    }
  }, [autoFetch, fetcher, depsChanged, executeFetch]);

  return {
    data,
    loading,
    error,
    refetch: executeFetch,
  };
}
