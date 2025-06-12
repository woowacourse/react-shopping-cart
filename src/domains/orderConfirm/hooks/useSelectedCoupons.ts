import { useState } from "react";
import { CouponCode } from "../types/coupon";

export function useSelectedCoupons() {
  const [selectedCoupons, setSelectedCoupons] = useState<CouponCode[]>([]);

  const handleCouponSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const couponCode = e.target.id as CouponCode;

    setSelectedCoupons((prev) => {
      if (prev.includes(couponCode))
        return prev.filter((id) => id !== couponCode);
      if (prev.length < 2) {
        return [...prev, couponCode];
      }
      return prev;
    });
  };

  return {
    handleCouponSelect,
    selectedCoupons,
  };
}
