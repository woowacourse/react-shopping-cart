import { useMemo, useState } from "react";
import { calculateDiscountAmountOfCoupon } from "../utils/calculateDiscountAmountOfCoupon";
import { orderAmountState } from "../recoil/cartAmount";
import { useRecoilState, useRecoilValue } from "recoil";
import { couponsState } from "../recoil/coupon/coupons";
import { Coupon } from "../types/coupons";

export const useCouponControl = (initCoupons: Coupon[]) => {
  const [globalCouponsState, setGlobalCouponsState] =
    useRecoilState(couponsState);

  const [coupons, setCoupons] = useState(
    globalCouponsState.length ? globalCouponsState : initCoupons
  );

  const orderAmount = useRecoilValue(orderAmountState);

  const discountAmount = useMemo(() => {
    const selectedCoupons = coupons.filter(({ isSelected }) => isSelected);
    return selectedCoupons.reduce(
      (discountAmount, coupon) =>
        discountAmount + calculateDiscountAmountOfCoupon(coupon, orderAmount),
      0
    );
  }, [orderAmount, coupons]);

  const toggleSelection = (couponId: number) => {
    setCoupons((prev) => {
      return prev.map((coupon) => {
        if (coupon.id !== couponId) {
          return coupon;
        }
        return { ...coupon, isSelected: !coupon.isSelected };
      });
    });
  };

  const applySelectedCoupons = () => {
    setGlobalCouponsState(coupons);
  };

  return {
    coupons,
    currentDiscountAmount: discountAmount,
    toggleSelection,
    applySelectedCoupons,
  };
};
