import { useCallback, useContext, useEffect } from "react";

import { ApiContext } from "../contexts/ApiContext";

export function useData<T>({
  fetcher,
  name,
}: {
  fetcher: () => Promise<T>;
  name: string;
}) {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("apiContext는 apiContextProvider 내부에 위치해야 합니다.");
  }
  const { state, dispatch } = context;

  const request = useCallback(async () => {
    dispatch({ type: "startFetch", name });
    try {
      const result = await fetcher();
      dispatch({ type: "fetchSuccess", name, payload: result });
    } catch (error) {
      dispatch({ type: "fetchError", name, error });
    } finally {
      dispatch({ type: "endFetch", name });
    }
  }, [fetcher, name, dispatch]);

  useEffect(() => {
    const hasData = state.data[name];
    if (hasData) return;
    request();
  }, [state.data, name, request]);

  return {
    data: (state.data[name] ?? []) as T,
    refetch: request,
    loading: state.loadingStates[name] ?? true,
    error: state.errorStates[name],
  };
}
