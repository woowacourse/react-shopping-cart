import { useRecoilValue } from "recoil";
import { cartAmountState } from "../../recoil/cartAmount";
import { Coupon } from "../../types/coupon";
import {
  isBuyXGetYCoupon,
  isFixedDiscountCoupon,
  isFreeShippingCoupon,
  isPercentageDiscountCoupon,
} from "../../utils/domain/couponTypeGuards";
import { cartItemsState } from "../../recoil/cartItems";
import {
  calculateBuyXGetYDiscountAmount,
  calculateFixedDiscountAmount,
  calculateFreeShippingDiscountAmount,
  calculatePercentageDiscountAmount,
} from "./discountCalculators";

interface UseCouponDiscountCalculatorReturn {
  calculateCouponDiscount: (coupon: Coupon, discountAmount: number) => number;
}

export const useCouponDiscountCalculator = (): UseCouponDiscountCalculatorReturn => {
  const cartItems = useRecoilValue(cartItemsState);
  const { orderAmount, shippingCost } = useRecoilValue(cartAmountState);

  const calculateCouponDiscount = (coupon: Coupon, discountAmount: number) => {
    if (!coupon.isSelected) return 0;

    const currentDiscountedOrderAmount = orderAmount - discountAmount;
    if (isFixedDiscountCoupon(coupon)) {
      return calculateFixedDiscountAmount(coupon);
    } else if (isPercentageDiscountCoupon(coupon)) {
      return calculatePercentageDiscountAmount(coupon, currentDiscountedOrderAmount);
    } else if (isBuyXGetYCoupon(coupon)) {
      return calculateBuyXGetYDiscountAmount(coupon, cartItems);
    } else if (isFreeShippingCoupon(coupon)) {
      return calculateFreeShippingDiscountAmount(shippingCost);
    }

    return 0;
  };

  return {
    calculateCouponDiscount,
  };
};
