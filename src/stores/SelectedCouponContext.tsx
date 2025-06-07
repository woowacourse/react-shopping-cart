import { createContext, useContext, useReducer } from "react";
import { DiscountType } from "../types/types";
import {
  initialState,
  selectCouponReducer,
  SelectAction,
} from "./SelectedCouponReducer";

const SelectedCouponContext = createContext<DiscountType[] | null>(null);
const SelectedCouponDispatchContext =
  createContext<React.Dispatch<SelectAction> | null>(null);

export function SelectedCouponProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(selectCouponReducer, initialState);

  return (
    <SelectedCouponContext.Provider value={state}>
      <SelectedCouponDispatchContext.Provider value={dispatch}>
        {children}
      </SelectedCouponDispatchContext.Provider>
    </SelectedCouponContext.Provider>
  );
}

export function useSelectedCouponContext() {
  const context = useContext(SelectedCouponContext);
  if (context === null) {
    throw new Error(
      "useSelectedCouponContext must be used within a SelectedCouponContext"
    );
  }
  return context;
}

export function useSelectedCouponDispatch() {
  const context = useContext(SelectedCouponDispatchContext);
  if (context === null) {
    throw new Error(
      "useSelectedCouponDispatch must be used within a SelectedCouponDispatchContext"
    );
  }
  return context;
}

export default SelectedCouponContext;
