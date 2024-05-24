import { useRecoilValue } from "recoil";
import { useCouponApplicabilityChecker } from "./useCouponApplicabilityChecker";
import { orderAmountSelector } from "../store/selector/selectors";

export const useDiscountCalculator = () => {
  const totalAmount = useRecoilValue(orderAmountSelector);
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const calculateFixedDiscount = (coupon: Coupon) => {
    // if (!isCouponApplicable(coupon, totalAmount)) {
    //   return 0;
    // }
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (coupon: Coupon) => {
    // if (!isCouponApplicable(coupon, totalAmount)) {
    //   return 0;
    // }
    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  const calculateDiscountAmount = (coupon: Coupon, now: Date = new Date()) => {
    // if (!isCouponApplicable(coupon, totalAmount, now)) {
    //   return 0;
    // }

    switch (coupon.discountType) {
      case "fixed":
        return calculateFixedDiscount(coupon);
      case "percentage":
        return calculatePercentageDiscount(coupon);
      default:
        return 0;
    }
  };

  const calculateTotalDiscountAmount = (couponList: Coupon[]) => {
    let totalAmount = 0;

    couponList.forEach((coupon) => {
      totalAmount += calculateDiscountAmount(coupon);
    });
    return totalAmount;
  };

  return {
    calculateTotalDiscountAmount,
  };
};
