import { createContext, PropsWithChildren, useReducer } from "react";
import { FetchActionType, FetchActionName } from "../type/FetchAction";

type State = {
  data: Record<string, unknown>;
  loadingStates: Record<string, boolean>;
  errorStates: Record<string, unknown>;
};

type Action =
  | { type: FetchActionType.StartFetch; name: FetchActionName }
  | {
      type: FetchActionType.FetchSuccess;
      name: FetchActionName;
      payload: unknown;
    }
  | {
      type: FetchActionType.FetchError;
      name: FetchActionName;
      error: unknown;
    }
  | { type: FetchActionType.EndFetch; name: FetchActionName };

const initialState: State = {
  data: {},
  loadingStates: {},
  errorStates: {},
};

function apiReducer(state: State, action: Action): State {
  switch (action.type) {
    case FetchActionType.StartFetch:
      return {
        ...state,
        loadingStates: { ...state.loadingStates, [action.name]: true },
        errorStates: { ...state.errorStates, [action.name]: undefined },
      };
    case FetchActionType.FetchSuccess:
      return {
        ...state,
        data: { ...state.data, [action.name]: action.payload },
        loadingStates: { ...state.loadingStates, [action.name]: false },
        errorStates: { ...state.errorStates, [action.name]: undefined },
      };
    case FetchActionType.FetchError:
      return {
        ...state,
        loadingStates: { ...state.loadingStates, [action.name]: false },
        errorStates: { ...state.errorStates, [action.name]: action.error },
      };
    case FetchActionType.EndFetch:
      return {
        ...state,
        loadingStates: { ...state.loadingStates, [action.name]: false },
      };
    default:
      return state;
  }
}

export const ApiContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export function ApiProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(apiReducer, initialState);

  return (
    <ApiContext.Provider value={{ state, dispatch }}>
      {children}
    </ApiContext.Provider>
  );
}
