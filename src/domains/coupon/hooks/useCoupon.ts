import { useContext, useMemo } from "react";
import { CouponContext, CouponType } from "../contexts/CouponContext";

export function useCoupon() {
  const context = useContext(CouponContext);
  if (!context) throw new Error("useCoupon must be used within CouponProvider");

  return context;
}

export function useCouponSelector<T>(selector: (state: CouponType) => T): T {
  const context = useCoupon();
  return useMemo(() => selector(context), [context, selector]);
}
