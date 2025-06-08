import { useCallback, useEffect } from "react";
import { Coupon } from "../apis/coupons";

export const useCouponValidation = (
  appliedCoupons: Coupon[],
  orderPrice: number,
  setAppliedCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>,
  setSelectedCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>
) => {
  const isCouponValid = useCallback(
    (coupon: Coupon, orderPrice: number): boolean => {
      switch (coupon.discountType) {
        case "fixed":
          return !coupon.minimumAmount || orderPrice >= coupon.minimumAmount;
        case "freeShipping":
          return !coupon.minimumAmount || orderPrice >= coupon.minimumAmount;
        case "percentage":
          return true;
        case "buyXgetY":
          return true;
        default:
          return true;
      }
    },
    []
  );

  useEffect(() => {
    if (appliedCoupons.length > 0) {
      const validCoupons = appliedCoupons.filter((coupon) =>
        isCouponValid(coupon, orderPrice)
      );

      if (validCoupons.length !== appliedCoupons.length) {
        setAppliedCoupons(validCoupons);
        setSelectedCoupons(validCoupons);
      }
    }
  }, [
    orderPrice,
    appliedCoupons,
    isCouponValid,
    setAppliedCoupons,
    setSelectedCoupons,
  ]);
};
