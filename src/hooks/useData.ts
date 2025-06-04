import { useCallback, useContext, useEffect } from "react";

import { ApiContext } from "../contexts/ApiContext";
import { FetchActionType, FetchActionName } from "../type/FetchAction";

export function useData<T>({
  fetcher,
  name,
}: {
  fetcher: () => Promise<T>;
  name: FetchActionName;
}) {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("apiContext는 apiContextProvider 내부에 위치해야 합니다.");
  }
  const { state, dispatch } = context;

  const request = useCallback(async () => {
    dispatch({ type: FetchActionType.StartFetch, name });
    try {
      const result = await fetcher();
      dispatch({ type: FetchActionType.FetchSuccess, name, payload: result });
    } catch (error) {
      dispatch({ type: FetchActionType.FetchError, name, error });
    } finally {
      dispatch({ type: FetchActionType.EndFetch, name });
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
