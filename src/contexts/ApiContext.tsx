import { createContext, PropsWithChildren, useReducer } from "react"
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

export const ApiContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => {},
})

export function ApiProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(apiReducer, initialState)

  return (
    <ApiContext.Provider value={{ state, dispatch }}>
      {children}
    </ApiContext.Provider>
  )
}
