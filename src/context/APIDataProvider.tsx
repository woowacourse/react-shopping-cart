import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

type APIStateMap = Record<
  string,
  {
    data?: unknown;
    loading: boolean;
    error: unknown;
  }
>;

const APIContext = createContext<{
  state: APIStateMap;
  setState: React.Dispatch<React.SetStateAction<APIStateMap>>;
}>({
  state: {},
  setState: () => {},
});

export function APIDataProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<APIStateMap>({});

  return (
    <APIContext.Provider value={{ state, setState }}>
      {children}
    </APIContext.Provider>
  );
}
export function useAPIDataContext<T>({
  fetcher,
  name,
}: {
  fetcher: () => Promise<T>;
  name: string;
}) {
  const { state, setState } = useContext(APIContext);

  const request = useCallback(async () => {
    try {
      const result = await fetcher();
      setState((prev) => ({
        ...prev,
        [name]: { data: result, loading: false, error: null },
      }));
    } catch (e) {
      setState((prev) => ({
        ...prev,
        [name]: { data: null, loading: false, error: e },
      }));
      throw new Error("데이터 요청에 실패하였습니다.");
    }
  }, [name, setState, fetcher]);

  useEffect(() => {
    if (!state[name]) request();
  }, [request, state, name]);

  const resource = state[name] || {
    data: null,
    loading: false,
    error: null,
  };

  return {
    data: resource.data as T | undefined,
    loading: resource.loading,
    error: resource.error,
    refetch: request,
  };
}
