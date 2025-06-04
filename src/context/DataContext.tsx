import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

interface DataState<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
}

type DataType = Record<string, DataState<unknown>>;

interface DataContextType {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
}

const DataContext = createContext<DataContextType>({
  data: {},
  setData: () => {},
});

export function DataProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<Record<string, DataState<unknown>>>({});

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
}

export function useData<T>({ fetcher, name }: { fetcher: () => Promise<T>; name: string }) {
  const { data, setData } = useContext(DataContext);

  const request = useCallback(async () => {
    setData((prev) => ({
      ...prev,
      [name]: { ...prev[name], isLoading: true, error: null },
    }));

    try {
      const response = await fetcher();
      setData((prev) => ({
        ...prev,
        [name]: { data: response, isLoading: false, error: null },
      }));
    } catch (error) {
      setData((prev) => ({
        ...prev,
        [name]: {
          data: prev[name]?.data,
          isLoading: false,
          error:
            error instanceof Error ? error : new Error('데이터를 불러오는 중 에러가 발생했습니다.'),
        },
      }));
    }
  }, [fetcher, name, setData]);

  useEffect(() => {
    const hasData = data[name]?.data;

    if (hasData) {
      return;
    }
    request();
  }, [data, name, request]);

  const currentData = data[name] as DataState<T> | undefined;

  return {
    data: currentData?.data,
    isLoading: currentData?.isLoading ?? false,
    error: currentData?.error ?? null,
    refetch: request,
  };
}
