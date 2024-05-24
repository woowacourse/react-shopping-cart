import {
  Coupon,
  FixedDiscountCoupon,
  isFixedDiscountCoupon,
} from "../types/coupons";
import { isMetMinimumAmount } from "./checkApplicableCoupon";

const calculateDiscountAmountOfFixedDiscountCoupon = (
  coupon: FixedDiscountCoupon,
  orderAmount: number
) => {
  // 아무 조건도 없는 경우
  if (!coupon.minimumAmount && !coupon.availableTime) {
    return coupon.discount;
  }

  // TODO: 모든 조건이 있는 경우
  // if (coupon.minimumAmount && coupon.availableTime) {
  //   isMetMinimumAmount(coupon, orderAmount) &&
  // }

  // TODO: 사용 가능 시간 조건만 있는 경우

  // 최소 주문 금액 조건만 있는 경우
  return isMetMinimumAmount(coupon, orderAmount) ? coupon.discount : 0;
};

export const calculateDiscountAmountOfCoupon = (
  coupon: Coupon,
  orderAmount: number
) => {
  switch (coupon.discountType) {
    case "fixed":
      if (isFixedDiscountCoupon(coupon)) {
        return calculateDiscountAmountOfFixedDiscountCoupon(
          coupon,
          orderAmount
        );
      }
      return 0;
    case "percentage":
      return orderAmount;
    default:
      return 0;
  }
};
