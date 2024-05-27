import { Coupon } from "@/types/coupon";
import { useRecoilValue } from "recoil";
import useCouponApplicabilityChecker from "./useCouponApplicabilityChecker";
import { SHIPPING_FEE } from "@/constants/shippingInfo.ts";
import {
  couponsByDiscountTypeSelector,
  maxBuyXgetYItemSelector,
} from "@/recoil/coupons";

const useDiscountCalculator = () => {
  const { isCouponApplicable } = useCouponApplicabilityChecker();
  const maxBuyXgetYItem = useRecoilValue(maxBuyXgetYItemSelector);
  const couponsByDiscountType = useRecoilValue(couponsByDiscountTypeSelector);

  const calculateFixedDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable({ coupon, price: totalAmount })) return 0;
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable({ coupon, price: totalAmount })) return 0;
    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  const calculateDiscountAmount = (coupon: Coupon, totalAmount: number) => {
    switch (coupon.discountType) {
      case "fixed":
        return calculateFixedDiscount(coupon, totalAmount);
      case "percentage":
        return calculatePercentageDiscount(coupon, totalAmount);
      default:
        return SHIPPING_FEE.basic;
    }
  };

  const calculateBogoDiscount = () => {
    return maxBuyXgetYItem;
  };

  const calculateTotalDiscount = (coupons: Coupon[], totalPrice: number) => {
    let totalDiscount = 0;

    if (coupons) {
      const { buyXgetY, percentage, fixed } = couponsByDiscountType;

      if (buyXgetY) {
        totalDiscount += calculateBogoDiscount();
      }

      if (percentage) {
        const sortedCoupons = [
          ...percentage.sort((a, b) => a.discount! - b.discount!),
        ];
        totalDiscount += sortedCoupons.reduce((acc, cur) => {
          acc += calculateDiscountAmount(cur, totalPrice - totalDiscount);
          return acc;
        }, 0);
      }

      if (fixed) {
        totalDiscount += fixed.reduce((acc, cur) => {
          acc += calculateDiscountAmount(cur, totalPrice - totalDiscount);
          return acc;
        }, 0);
      }
    }
    return totalDiscount;
  };

  return {
    calculateDiscountAmount,
    calculateBogoDiscount,
    calculateTotalDiscount,
  };
};

export default useDiscountCalculator;
