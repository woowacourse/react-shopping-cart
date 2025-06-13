import { createContext, useContext, useReducer } from "react";
import {
  CouponSelectAction,
  couponSelectReducer,
  initialState,
  CouponSelectState,
} from "./CouponSelectReducer";

const CouponSelectContext = createContext<CouponSelectState[] | null>(null);
const CouponSelectDispatchContext =
  createContext<React.Dispatch<CouponSelectAction> | null>(null);

export function CouponSelectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(couponSelectReducer, initialState);

  return (
    <CouponSelectContext.Provider value={state}>
      <CouponSelectDispatchContext.Provider value={dispatch}>
        {children}
      </CouponSelectDispatchContext.Provider>
    </CouponSelectContext.Provider>
  );
}

export function useCouponSelectContext() {
  const context = useContext(CouponSelectContext);
  if (context === null) {
    throw new Error(
      "useCouponSelectContext must be used within a CouponSelectProvider"
    );
  }
  return context;
}

export function useCouponSelectDispatch() {
  const context = useContext(CouponSelectDispatchContext);
  if (context === null) {
    throw new Error(
      "useCouponSelectDispatch must be used within a CouponSelectProvider"
    );
  }
  return context;
}

export default CouponSelectContext;
