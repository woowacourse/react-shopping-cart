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

type CalculateCouponDiscount = (coupon: Coupon) => number;

export const useCouponDiscountCalculator = (): CalculateCouponDiscount => {
  const cartItems = useRecoilValue(cartItemsState);
  const { orderAmount, shippingCost } = useRecoilValue(cartAmountState);

  return (coupon: Coupon) => {
    if (!coupon.isSelected) return 0;

    if (isFixedDiscountCoupon(coupon)) {
      return calculateFixedDiscountAmount(coupon);
    } else if (isPercentageDiscountCoupon(coupon)) {
      return calculatePercentageDiscountAmount(coupon, orderAmount);
    } else if (isBuyXGetYCoupon(coupon)) {
      return calculateBuyXGetYDiscountAmount(coupon, cartItems);
    } else if (isFreeShippingCoupon(coupon)) {
      return calculateFreeShippingDiscountAmount(shippingCost);
    }

    return 0;
  };
};
