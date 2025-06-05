import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { uniqueIdentifier } from "../api/UniqueIdentifier";

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
    uniqueIdentifier.add(name);

    setState((prev) => ({
      ...prev,
      [name]: { ...prev[name], loading: true, error: null },
    }));

    try {
      const result = await fetcher();
      setState((prev) => ({
        ...prev,
        [name]: { data: result, loading: false, error: null },
      }));
    } catch (e) {
      setState((prev) => ({
        ...prev,
        [name]: { ...prev[name], loading: false, error: e },
      }));
      throw new Error("데이터 요청 실패");
    }
  }, [name, setState, state]);

  useEffect(() => {
    if (uniqueIdentifier.get(name)) {
      return;
    }

    if (!state[name]?.data && !state[name]?.loading) {
      request();
    }
  }, [name]);

  return {
    data: state[name]?.data as T | undefined,
    loading: state[name]?.loading ?? false,
    error: state[name]?.error,
    refetch: request,
  };
}
