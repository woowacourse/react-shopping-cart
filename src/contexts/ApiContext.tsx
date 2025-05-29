import { createContext, PropsWithChildren, useReducer } from "react";

type State = {
  data: Record<string, unknown>;
  loadingStates: Record<string, boolean>;
  errorStates: Record<string, unknown>;
};

type Action =
  | { type: "startFetch"; name: string }
  | { type: "fetchSuccess"; name: string; payload: unknown }
  | { type: "fetchError"; name: string; error: unknown }
  | { type: "endFetch"; name: string };

const initialState: State = {
  data: {},
  loadingStates: {},
  errorStates: {},
};

function apiReducer(state: State, action: Action): State {
  switch (action.type) {
    case "startFetch":
      return {
        ...state,
        loadingStates: { ...state.loadingStates, [action.name]: true },
        errorStates: { ...state.errorStates, [action.name]: undefined },
      };
    case "fetchSuccess":
      return {
        ...state,
        data: { ...state.data, [action.name]: action.payload },
        loadingStates: { ...state.loadingStates, [action.name]: false },
        errorStates: { ...state.errorStates, [action.name]: undefined },
      };
    case "fetchError":
      return {
        ...state,
        loadingStates: { ...state.loadingStates, [action.name]: false },
        errorStates: { ...state.errorStates, [action.name]: action.error },
      };
    case "endFetch":
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
