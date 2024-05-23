import { couponApplicabilityChecker } from './couponApplicabilityChecker';

import { CartItemProps } from '@/types/cartItem';
import { Coupon } from '@/types/coupon';

const couponDiscountCalculator = (couponList: Coupon[]) => {
  const { isCouponApplicable } = couponApplicabilityChecker(couponList);

  // 고정 할인
  const calculateFixedDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }

    return coupon.discount ?? 0;
  };

  // 비율 할인
  const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }

    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  // 2 + 1 할인
  const calculateTwoPlusOneDiscount = (
    coupon: Coupon,
    totalAmount: number,
    checkedCartItems?: CartItemProps[],
  ) => {
    if (!isCouponApplicable(coupon, totalAmount) || !checkedCartItems) {
      return 0;
    }

    const overThreeQuantityItems = checkedCartItems.filter((cartItem) => cartItem.quantity >= 3);

    if (!overThreeQuantityItems) {
      return 0;
    }

    return Math.max(...overThreeQuantityItems.map((cartItem) => cartItem.product.price));
  };

  // coupon 타입에 따라 반환값 분기처리
  const calculateDiscountAmount = (
    coupon: Coupon,
    totalAmount: number,
    checkedCartItems?: CartItemProps[],
    now: Date = new Date(),
  ) => {
    if (!isCouponApplicable(coupon, totalAmount, now)) {
      return 0;
    }

    switch (coupon.discountType) {
      case 'fixed':
        return calculateFixedDiscount(coupon, totalAmount);
      case 'percentage':
        return calculatePercentageDiscount(coupon, totalAmount);
      case 'buyXgetY':
        return calculateTwoPlusOneDiscount(coupon, totalAmount, checkedCartItems);
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};

export default couponDiscountCalculator;
