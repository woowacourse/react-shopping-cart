import { useState } from "react";
import { CouponType } from "../../types/coupon";

export default function useCoupon() {
  const [selectedCoupon, setSelectedCoupon] = useState(new Set<CouponType>());

  function addCoupon(couponType: CouponType) {
    setSelectedCoupon((prev) => prev.add(couponType));
  }

  function removeCoupon(couponType: CouponType) {
    setSelectedCoupon((prev) => {
      prev.delete(couponType);
      return prev;
    });
  }

  return { selectedCoupon, addCoupon, removeCoupon };
}
