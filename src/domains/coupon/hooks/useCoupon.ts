import { useContext, useMemo } from "react";
import { CouponContext, CouponContextType } from "../contexts/CouponContext";

export function useCoupon() {
  const context = useContext(CouponContext);
  if (!context) throw new Error("useCoupon must be used within CouponProvider");

  return context;
}

export function useCouponSelector<T>(
  selector: (state: CouponContextType) => T
): T {
  const context = useCoupon();
  return useMemo(() => selector(context), [context, selector]);
}
