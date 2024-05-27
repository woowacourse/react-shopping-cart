import { useMemo, useState } from "react";
import { calculateDiscountAmountOfCoupon } from "../utils/calculateDiscountAmountOfCoupon";
import { deliveryCostState, orderAmountState } from "../recoil/cartAmount";
import { useRecoilState, useRecoilValue } from "recoil";
import { couponsState } from "../recoil/coupon/coupons";
import { Coupon } from "../types/coupons";
import { cartItemsState } from "../recoil/cart/cartItems";

export const useCouponControl = (initCoupons: Coupon[]) => {
  const deliveryCost = useRecoilValue(deliveryCostState);
  const cartItems = useRecoilValue(cartItemsState);

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
        discountAmount +
        calculateDiscountAmountOfCoupon(coupon, {
          orderAmount,
          cartItems,
          deliveryCost,
        }),
      0
    );
  }, [orderAmount, coupons]);

  const isCheckableCouponsYet = useMemo(() => {
    return coupons.filter((coupon) => coupon.isSelected).length < 2;
  }, [coupons]);

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
    discountAmount,
    isCheckableCouponsYet,
    toggleSelection,
    applySelectedCoupons,
  };
};
