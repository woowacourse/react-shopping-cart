import { useState, useCallback, useEffect, DependencyList, useRef } from 'react';

interface UseFetchOptions<T> {
  fetchFn: () => Promise<T>;
  immediate?: boolean;
  deps?: DependencyList;
}

function useFetch<T>({ fetchFn, deps = [] }: UseFetchOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const fetcher = useCallback(async () => {
    const controller = new AbortController();
    controllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setIsLoading(false);
    }
  }, deps);

  useEffect(() => {
    fetcher();

    return () => {
      controllerRef.current?.abort();
    };
  }, [fetcher]);

  return { data, isLoading, error, fetcher };
}

export default useFetch;
