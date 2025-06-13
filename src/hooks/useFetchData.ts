import { useReducer, useCallback, useEffect } from "react";
import { FetchActionType, InitialLoadingActionType } from "../type/FetchAction";

type State<T> = {
  data: T | undefined;
  initialLoading: boolean;
  fetching: boolean;
  error: unknown;
};

type Action<T> =
  | { type: FetchActionType.StartFetch }
  | { type: FetchActionType.FetchSuccess; payload: T }
  | { type: FetchActionType.FetchError; error: unknown }
  | { type: InitialLoadingActionType.StartInitialLoading }
  | { type: InitialLoadingActionType.EndInitialLoading };

const initialState = <T>(): State<T> => ({
  data: undefined,
  initialLoading: false,
  fetching: false,
  error: undefined,
});

function apiReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case InitialLoadingActionType.StartInitialLoading:
      return { ...state, initialLoading: true, error: undefined };
    case InitialLoadingActionType.EndInitialLoading:
      return { ...state, initialLoading: false };
    case FetchActionType.StartFetch:
      return { ...state, fetching: true, error: undefined };
    case FetchActionType.FetchSuccess:
      return {
        ...state,
        data: action.payload,
        fetching: false,
        error: undefined,
      };
    case FetchActionType.FetchError:
      return { ...state, fetching: false, error: action.error };

    default:
      return state;
  }
}

const useFetchData = <T>({ fetcher }: { fetcher: () => Promise<T> }) => {
  const [state, dispatch] = useReducer(apiReducer<T>, initialState<T>());

  const fetchData = useCallback(async () => {
    dispatch({ type: FetchActionType.StartFetch });
    try {
      const result = await fetcher();
      dispatch({ type: FetchActionType.FetchSuccess, payload: result });
    } catch (error) {
      dispatch({ type: FetchActionType.FetchError, error });
    }
  }, [fetcher]);

  const initialLoading = useCallback(async () => {
    dispatch({ type: InitialLoadingActionType.StartInitialLoading });
    await fetchData();
    dispatch({ type: InitialLoadingActionType.EndInitialLoading });
  }, [fetchData]);

  useEffect(() => {
    initialLoading();
  }, [initialLoading]);

  return {
    data: (state.data ?? []) as T,
    refetch: fetchData,
    isLoading: state.initialLoading,
    isFetching: state.fetching,
    error: state.error,
  };
};

export default useFetchData;
