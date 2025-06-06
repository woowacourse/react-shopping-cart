import {
  createContext,
  PropsWithChildren,
  useReducer,
  useCallback,
  useContext,
  useEffect,
} from "react"
import { FetchActionType } from "../type/FetchAction"

type State = {
  data: unknown
  loading: boolean
  error: unknown
}

type Action =
  | { type: FetchActionType.StartFetch }
  | { type: FetchActionType.FetchSuccess; payload: unknown }
  | { type: FetchActionType.FetchError; error: unknown }
  | { type: FetchActionType.EndFetch }

const initialState: State = {
  data: undefined,
  loading: false,
  error: undefined,
}

function apiReducer(state: State, action: Action): State {
  switch (action.type) {
    case FetchActionType.StartFetch:
      return { ...state, loading: true, error: undefined }
    case FetchActionType.FetchSuccess:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: undefined,
      }
    case FetchActionType.FetchError:
      return { ...state, loading: false, error: action.error }
    case FetchActionType.EndFetch:
      return { ...state, loading: false }
    default:
      return state
  }
}

const CartItemsContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
} | null>(null)

export function CartItemsProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(apiReducer, initialState)

  return (
    <CartItemsContext.Provider value={{ state, dispatch }}>
      {children}
    </CartItemsContext.Provider>
  )
}

export function useCartItemsContext<T>({
  fetcher,
}: {
  fetcher: () => Promise<T>
}) {
  const context = useContext(CartItemsContext)

  if (!context) {
    throw new Error(
      "cartItemsContext는 cartItemsContextProvider 내부에 위치해야 합니다.",
    )
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
