import { useContext } from "react";
import { CouponContext } from "../contexts/CouponContext";

export function useCoupon() {
  const context = useContext(CouponContext);
  if (!context) throw new Error("useCoupon must be used within CouponProvider");

  return context;
}
