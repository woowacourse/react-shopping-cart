import { useCallback, useContext, useEffect } from "react"

import { ApiContext } from "../contexts/ApiContext"
import { FetchActionType } from "../type/FetchAction"

export function useData<T>({ fetcher }: { fetcher: () => Promise<T> }) {
  const context = useContext(ApiContext)

  if (!context) {
    throw new Error("apiContext는 apiContextProvider 내부에 위치해야 합니다.")
  }

  const { state, dispatch } = context

  const request = useCallback(async () => {
    dispatch({ type: FetchActionType.StartFetch })
    try {
      const result = await fetcher()
      dispatch({ type: FetchActionType.FetchSuccess, payload: result })
    } catch (error) {
      dispatch({ type: FetchActionType.FetchError, error })
    } finally {
      dispatch({ type: FetchActionType.EndFetch })
    }
  }, [fetcher, dispatch])

  useEffect(() => {
    const hasData = state.data
    if (hasData) return
    request()
  }, [state.data, request])

  return {
    data: (state.data ?? []) as T,
    refetch: request,
    loading: state.loading ?? true,
    error: state.error,
  }
}
