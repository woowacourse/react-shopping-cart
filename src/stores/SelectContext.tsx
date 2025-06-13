import { createContext, useContext, useReducer, useEffect } from "react";
import { SelectAction, selectReducer, SelectState } from "./SelectReducer";

const STORAGE_KEY = "cart_select_state";

const loadInitialState = (): SelectState[] => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : [];
  } catch (error) {
    console.error("Failed to load select state from localStorage:", error);
    return [];
  }
};

const saveStateToStorage = (state: SelectState[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save select state to localStorage:", error);
  }
};

const SelectContext = createContext<SelectState[] | null>(null);
const SelectDispatchContext =
  createContext<React.Dispatch<SelectAction> | null>(null);

export function SelectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(selectReducer, [], loadInitialState);

  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

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
