import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

export const DataContext = createContext<{
  data: Record<string, unknown>;
  setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}>({
  data: {},
  setData: () => {},
});

export function DataProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState({});

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
}

export function useData<T>({ fetcher, name }: { fetcher: () => Promise<T>; name: string }) {
  const { data, setData } = useContext(DataContext);

  const request = useCallback(() => {
    fetcher().then((res) => {
      setData((data) => {
        return { ...data, [name]: res };
      });
    });
  }, [fetcher, name, setData]);

  useEffect(() => {
    const hasData = data[name];

    if (hasData) {
      return;
    }
    request();
  }, [data, name, request]);

  return { data: data[name] as T | undefined, refetch: request };
}
