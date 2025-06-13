import { createContext, useContext, useReducer, useMemo } from "react";
import {
  SelectAction,
  selectReducer,
  initialState,
  SelectState,
} from "./SelectReducer";

interface SelectContextValue {
  selectedState: SelectState[];
  isAllSelected: boolean;
}

const SelectContext = createContext<SelectContextValue | null>(null);
const SelectDispatchContext =
  createContext<React.Dispatch<SelectAction> | null>(null);

export function SelectProvider({ children }: { children: React.ReactNode }) {
  const [selectedState, dispatch] = useReducer(selectReducer, initialState);

  const contextValue = useMemo(() => {
    const isAllSelected = selectedState.every((item) => item.selected);

    return {
      selectedState,
      isAllSelected,
    };
  }, [selectedState]);

  return (
    <SelectContext.Provider value={contextValue}>
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
