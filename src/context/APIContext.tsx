import { createContext, useCallback, useContext, useEffect, useState, type PropsWithChildren } from 'react';

type APIState = {
  data: Record<string, unknown>;
  loading: Record<string, boolean>;
  error: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  setLoading: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setError: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
};

const APIContext = createContext<APIState>({
  data: {},
  loading: {},
  error: {},
  setData: () => {},
  setLoading: () => {},
  setError: () => {},
});

export function APIProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  return (
    <APIContext.Provider value={{ data, loading, error, setData, setLoading, setError }}>
      {children}
    </APIContext.Provider>
  );
}

export function useAPI<T>({ name, fetcher }: { name: string; fetcher: () => Promise<T> }) {
  const { data, loading, error, setData, setLoading, setError } = useContext(APIContext);

  const request = useCallback(() => {
    setLoading((prev) => ({ ...prev, [name]: true }));
    setError((prev) => ({ ...prev, [name]: null }));

    fetcher()
      .then((res) => {
        setData((prev) => ({ ...prev, [name]: res }));
      })
      .catch((err) => {
        setError((prev) => ({ ...prev, [name]: err }));
      })
      .finally(() => {
        setLoading((prev) => ({ ...prev, [name]: false }));
      });
  }, [fetcher, name, setData, setError, setLoading]);

  useEffect(() => {
    if (!data[name]) {
      request();
    }
  }, [name, data, request]);

  return {
    data: data[name] as T | undefined,
    isLoading: loading[name] ?? false,
    isError: !!error[name],
    refetch: request,
  };
}
