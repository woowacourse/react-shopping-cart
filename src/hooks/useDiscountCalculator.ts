import { Coupon } from "../types";
import { useCouponApplicabilityChecker } from "./useCouponApplicabilityChecker";

export const useDiscountCalculator = () => {
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const calculateFixedDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }
    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  const calculateBuyXGetYDiscount = (coupon: Coupon, totalAmount: number, quantity: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }

    const { buyQuantity, getQuantity } = coupon;
    if (buyQuantity && getQuantity && quantity >= buyQuantity + getQuantity) {
      const freeQuantity = Math.floor(quantity / (buyQuantity + getQuantity)) * getQuantity;
      const pricePerItem = totalAmount / quantity;
      return freeQuantity * pricePerItem;
    }

    return 0;
  };

  const calculateFreeShippingDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }
    return 0;
  };

  const calculateDiscountAmount = (coupon: Coupon, totalAmount: number, quantity: number = 1) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }

    switch (coupon.discountType) {
      case "fixed":
        return calculateFixedDiscount(coupon, totalAmount);
      case "percentage":
        return calculatePercentageDiscount(coupon, totalAmount);
      case "buyXgetY":
        return calculateBuyXGetYDiscount(coupon, totalAmount, quantity);
      case "freeShipping":
        return calculateFreeShippingDiscount(coupon, totalAmount);
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};
