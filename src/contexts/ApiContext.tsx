import {
  createContext,
  DependencyList,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren
} from 'react';

const ApiContext = createContext<{
  data: Record<string, unknown>;
  setData: Dispatch<SetStateAction<Record<string, unknown>>>;
}>({
  data: {},
  setData: () => {}
});

export function ApiProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState({});

  return <ApiContext.Provider value={{ data, setData }}>{children}</ApiContext.Provider>;
}

export function useApiContext<T>({
  fetchFn,
  key,
  deps
}: {
  fetchFn: () => Promise<T>;
  key: string;
  deps?: DependencyList;
}) {
  const { data, setData } = useContext(ApiContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const request = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetchFn();

      setData((prev) => ({ ...prev, [key]: res }));
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, key, setData]);

  useEffect(() => {
    if (data[key] === undefined) {
      request();
    }
  }, [data, key, request, deps]);

  return {
    data: data[key] as T | undefined,
    isLoading,
    error,
    fetcher: request
  };
}
