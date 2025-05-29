import { createContext, useContext, useReducer } from "react";
import {
  SelectAction,
  selectReducer,
  initialState,
  SelectState,
} from "./SelectReducer";

const SelectContext = createContext<SelectState[] | null>(null);
const SelectDispatchContext =
  createContext<React.Dispatch<SelectAction> | null>(null);

export function SelectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(selectReducer, initialState);

  return (
    <SelectContext.Provider value={state}>
      <SelectDispatchContext.Provider value={dispatch}>
        {children}
      </SelectDispatchContext.Provider>
    </SelectContext.Provider>
  );
}

export function useSelectContext() {
  const context = useContext(SelectContext);
  if (context === null) {
    throw new Error("useSelectContext must be used within a SelectProvider");
  }
  return context;
}

export function useSelectDispatch() {
  const context = useContext(SelectDispatchContext);
  if (context === null) {
    throw new Error("useSelectDispatch must be used within a SelectProvider");
  }
  return context;
}

export default SelectContext;
