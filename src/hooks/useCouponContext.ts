import { useContext } from "react";
import { CouponContext } from "../contexts/CouponContext";

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context)
    throw new Error("useCouponContext must be used within CouponProvider");
  return context;
};
