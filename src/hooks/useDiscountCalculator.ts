import { useRecoilValue } from "recoil";
import { useCouponApplicabilityChecker } from "./useCouponApplicabilityChecker";
import { checkedCartItemsSelector, orderAmountSelector } from "../store/selector/selectors";

export const useDiscountCalculator = () => {
  const checkedCartItems = useRecoilValue(checkedCartItemsSelector);
  const orderAmount = useRecoilValue(orderAmountSelector);
  const { isCouponApplicable } = useCouponApplicabilityChecker();

  const calculateFixedDiscount = (coupon: Coupon) => {
    if (!isCouponApplicable(coupon, orderAmount)) {
      return 0;
    }
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (coupon: Coupon) => {
    if (!isCouponApplicable(coupon, orderAmount)) {
      return 0;
    }
    return Math.floor((orderAmount * (coupon.discount ?? 0)) / 100);
  };

  const calculateBuyXGetYDiscount = (coupon: Coupon) => {
    const itemsMoreThanX = checkedCartItems.filter(
      (cartItem) => cartItem.quantity >= coupon.buyQuantity! + coupon.getQuantity!
    );

    return Math.max(...itemsMoreThanX.map((item) => item.product.price), 0);
  };

  const calculateDiscountAmount = (coupon: Coupon, now: Date = new Date()) => {
    if (!isCouponApplicable(coupon, orderAmount, now)) {
      return 0;
    }

    switch (coupon.discountType) {
      case "fixed":
        return calculateFixedDiscount(coupon);
      case "percentage":
        return calculatePercentageDiscount(coupon);
      case "buyXgetY":
        return calculateBuyXGetYDiscount(coupon);
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
