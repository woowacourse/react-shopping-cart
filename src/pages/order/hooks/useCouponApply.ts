import { CartItem } from "../../../shared/types/cartItem";
import { AvailableCouponType, CouponResponse } from "../../../shared/types/coupon";
import { useState, useEffect, useMemo } from "react";
import useCouponDiscount from "./useCouponDiscount";
import useCouponValidation from "./useCouponValidation";

interface useCouponApplyParams {
  cartItems: CartItem[];
  orderPrice: number;
  coupons: CouponResponse[];
  deliveryPrice: number;
  isRemoteArea: boolean;
}

const useCouponApply = ({ cartItems, orderPrice, coupons, deliveryPrice, isRemoteArea }: useCouponApplyParams) => {
  const validCoupons = useCouponValidation({ cartItems, orderPrice, coupons });
  const couponsWithDiscount = useCouponDiscount({
    coupons: validCoupons,
    cartItems,
    orderPrice,
    deliveryPrice,
    isRemoteArea,
  });

  const [availableCoupons, setAvailableCoupons] = useState<AvailableCouponType[]>([]);

  const discountPrice = useMemo(() => {
    return availableCoupons.filter((coupon) => coupon.selected).reduce((sum, coupon) => sum + coupon.discountAmount, 0);
  }, [availableCoupons]);

  const updateApplyCoupon = (tempSelectedCoupons: AvailableCouponType[]) => {
    setAvailableCoupons(tempSelectedCoupons);
  };

  useEffect(() => {
    const sorted = [...couponsWithDiscount].sort((a, b) => b.discountAmount - a.discountAmount);
    const initialCoupons = sorted.map((coupon, index) => ({
      ...coupon,
      selected: index < 2,
    }));
    setAvailableCoupons(initialCoupons);
  }, [coupons]);

  useEffect(() => {
    setAvailableCoupons((prevCoupons) =>
      prevCoupons.map((coupon) => {
        const newDiscountInfo = couponsWithDiscount.find((newCoupon) => newCoupon.code === coupon.code);
        return {
          ...coupon,
          discountAmount: newDiscountInfo?.discountAmount || 0,
        };
      }),
    );
  }, [isRemoteArea]);

  return {
    availableCoupons,
    discountPrice,
    updateApplyCoupon,
  };
};

export default useCouponApply;
