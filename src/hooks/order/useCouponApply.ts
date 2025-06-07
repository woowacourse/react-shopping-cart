import { CartItem } from "../../types/cartItem";
import { CouponResponse } from "../../types/coupon";
import { useState, useEffect, useMemo } from "react";
import createTodayTime from "../../utils/\bcoupon/createTodayTime";

interface useCouponApplyParams {
  cartItems: CartItem[];
  orderPrice: number;
  coupons: CouponResponse[];
  deliveryPrice: number;
  isRemoteArea: boolean;
}

interface AvailableCouponType {
  code: string;
  discountAmount: number;
  selected: boolean;
}

const useCouponApply = ({ cartItems, orderPrice, coupons, deliveryPrice, isRemoteArea }: useCouponApplyParams) => {
  const [availableCoupons, setAvailableCoupons] = useState<AvailableCouponType[]>([]);

  const validateCouponDate = (coupon: CouponResponse): boolean => {
    const now = new Date();
    const expirationDate = new Date(coupon.expirationDate);
    return now <= expirationDate;
  };

  const validateMinimumAmount = (coupon: CouponResponse): boolean => {
    if (!coupon.minimumAmount) return true;
    return orderPrice >= coupon.minimumAmount;
  };

  const validateBuyQuantity = (coupon: CouponResponse): boolean => {
    if (!coupon.buyQuantity || !coupon.getQuantity) return true;
    return cartItems.some((item) => item.quantity >= coupon.buyQuantity! + coupon.getQuantity!);
  };

  const validateAvailableTime = (coupon: CouponResponse): boolean => {
    if (!coupon.availableTime) return true;

    const now = new Date();
    const start = createTodayTime(coupon.availableTime.start);
    const end = createTodayTime(coupon.availableTime.end);

    return now >= start && now <= end;
  };

  const calculateDiscount = (coupon: CouponResponse): number => {
    switch (coupon.discountType) {
      case "percentage": {
        if (!coupon.discount) return 0;
        return orderPrice * (coupon.discount / 100);
      }
      case "fixed": {
        return coupon.discount || 0;
      }
      case "freeShipping": {
        return isRemoteArea ? deliveryPrice + 3000 : deliveryPrice;
      }
      case "buyXgetY": {
        if (!coupon.buyQuantity || !coupon.getQuantity) return 0;

        const eligibleItems = cartItems
          .filter((item) => item.quantity >= coupon.buyQuantity! + coupon.getQuantity!)
          .map((item) => item.product.price * coupon.getQuantity!)
          .sort((a, b) => b - a);

        return eligibleItems.length > 0 ? eligibleItems[0] : 0;
      }
      default:
        return 0;
    }
  };

  const availableCouponsWithDiscount = useMemo(
    () =>
      coupons
        .filter(
          (coupon) =>
            validateCouponDate(coupon) &&
            validateMinimumAmount(coupon) &&
            validateBuyQuantity(coupon) &&
            validateAvailableTime(coupon),
        )
        .map((coupon) => ({
          code: coupon.code,
          discountAmount: calculateDiscount(coupon),
          selected: false,
        }))
        .sort((a, b) => b.discountAmount - a.discountAmount),
    [coupons, isRemoteArea],
  );

  const discountPrice = availableCoupons
    .filter((coupon) => coupon.selected)
    .reduce((sum, coupon) => sum + coupon.discountAmount, 0);

  const updateApplyCoupon = (tempSelectedCoupons: AvailableCouponType[]) => {
    setAvailableCoupons(tempSelectedCoupons);
  };

  useEffect(() => {
    if (availableCouponsWithDiscount.length === 0) return;
    const initialCoupons = availableCouponsWithDiscount.map((coupon, index) => ({
      ...coupon,
      selected: index < 2,
    }));
    setAvailableCoupons(initialCoupons);
  }, [coupons]);

  useEffect(() => {
    setAvailableCoupons((prevCoupons) =>
      prevCoupons.map((coupon) => {
        const newDiscountInfo = availableCouponsWithDiscount.find((newCoupon) => newCoupon.code === coupon.code);
        return {
          ...coupon,
          discountAmount: newDiscountInfo?.discountAmount || 0,
        };
      }),
    );
  }, [availableCouponsWithDiscount]);

  return {
    availableCoupons,
    discountPrice,
    updateApplyCoupon,
  };
};

export default useCouponApply;
