import { couponApplicabilityChecker } from './couponApplicabilityChecker';

import { DiscountType } from '@/constants/coupon';
import { CartItemProps } from '@/types/cartItem';
import { Coupon } from '@/types/coupon';

const couponDiscountCalculator = (couponList: Coupon[]) => {
  const { isCouponApplicable } = couponApplicabilityChecker(couponList);

  // 고정 할인
  const calculateFixedDiscount = (coupon: Coupon, totalOrderPrice: number) => {
    if (!isCouponApplicable({ coupon, totalOrderPrice })) {
      return 0;
    }

    return coupon.discount ?? 0;
  };

  // 비율 할인
  const calculatePercentageDiscount = (coupon: Coupon, totalOrderPrice: number) => {
    if (!isCouponApplicable({ coupon, totalOrderPrice })) {
      return 0;
    }

    return Math.floor((totalOrderPrice * (coupon.discount ?? 0)) / 100);
  };

  // 2 + 1 할인
  const calculateTwoPlusOneDiscount = (
    coupon: Coupon,
    totalOrderPrice: number,
    checkedCartItems?: CartItemProps[],
  ) => {
    if (!isCouponApplicable({ coupon, totalOrderPrice }) || !checkedCartItems) {
      return 0;
    }

    const overThreeQuantityItems = checkedCartItems.filter((cartItem) => cartItem.quantity >= 3);

    if (overThreeQuantityItems.length === 0) {
      return 0;
    }

    return Math.max(...overThreeQuantityItems.map((cartItem) => cartItem.product.price));
  };

  // coupon 타입에 따라 반환값 분기처리
  const calculateDiscountAmount = (
    coupon: Coupon,
    totalOrderPrice: number,
    checkedCartItems?: CartItemProps[],
    now: Date = new Date(),
  ) => {
    if (!isCouponApplicable({ coupon, totalOrderPrice, now })) {
      return 0;
    }

    switch (coupon.discountType) {
      case DiscountType.fixed:
        return calculateFixedDiscount(coupon, totalOrderPrice);
      case DiscountType.percentage:
        return calculatePercentageDiscount(coupon, totalOrderPrice);
      case DiscountType.buyXgetY:
        return calculateTwoPlusOneDiscount(coupon, totalOrderPrice, checkedCartItems);
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};

export default couponDiscountCalculator;
