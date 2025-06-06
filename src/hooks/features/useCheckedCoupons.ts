import type { CouponType } from "../../types/response";
import { COUPON_LIMIT } from "../../constants/systemConstants";
import { useState } from "react";

const useCheckedCoupons = () => {
  const [isCheckedCoupons, setIsCheckedCoupons] = useState<
    Map<number, CouponType>
  >(new Map());

  const toggleCheckedCoupon = (couponInfo: CouponType) => {
    if (isCheckedCoupons.has(couponInfo.id)) {
      removeCheckedCoupon(couponInfo);
      return;
    }
    addCheckedCoupon(couponInfo);
  };

  const addCheckedCoupon = (couponInfo: CouponType) => {
    if (isCheckedCoupons.size >= COUPON_LIMIT) return;
    setIsCheckedCoupons((prev: Map<number, CouponType>) => {
      const newIsCheckedCoupons = new Map(prev);
      newIsCheckedCoupons.set(couponInfo.id, couponInfo);
      return newIsCheckedCoupons;
    });
  };

  const removeCheckedCoupon = (couponInfo: CouponType) => {
    setIsCheckedCoupons((prev: Map<number, CouponType>) => {
      const newIsCheckedCoupons = new Map(prev);
      newIsCheckedCoupons.delete(couponInfo.id);
      return newIsCheckedCoupons;
    });
  };

  return { isCheckedCoupons, toggleCheckedCoupon };
};

export default useCheckedCoupons;
