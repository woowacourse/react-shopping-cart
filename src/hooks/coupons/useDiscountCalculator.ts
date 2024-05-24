import { useCouponApplicabilityChecker } from ".";
import { SHIPPING_FEE } from "../../constants";
import { CartItemType, Coupon } from "../../types";

const useDiscountCalculator = () => {
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const calculateFixedDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable({ coupon, totalAmount })) {
      return 0;
    }
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable({ coupon, totalAmount })) {
      return 0;
    }
    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  const calculateDiscountAmount = ({
    coupon,
    totalAmount,
    now = new Date(),
  }: {
    coupon: Coupon;
    totalAmount: number;
    cartItems: CartItemType[];
    now?: Date;
  }) => {
    if (!isCouponApplicable({ coupon, totalAmount, now })) {
      return 0;
    }

    switch (coupon.discountType) {
      case "fixed":
        return calculateFixedDiscount(coupon, totalAmount);
      case "percentage":
        return calculatePercentageDiscount(coupon, totalAmount);
      case "freeShipping":
        return SHIPPING_FEE;
      case "buyXgetY":
        return 5_000;
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};

export default useDiscountCalculator;
