import { MINIMUM_AMOUNT_FOR_FREE_DELIVERY } from "../constants/servicePolicy";
import { CartItem } from "../types/cartItems";
import {
  BOGOCoupon,
  Coupon,
  RawCoupon,
  isBOGOCoupon,
  isFixedDiscountCoupon,
  isFreeShippingCoupon,
  isPercentageDiscountCoupon,
} from "../types/coupons";

export const isMetMinimumAmount = (
  coupon: Coupon | RawCoupon,
  orderAmount: number
): boolean => {
  if ("minimumAmount" in coupon && coupon.minimumAmount) {
    return orderAmount >= coupon.minimumAmount;
  }
  return true;
};

export const isAvailableTime = (coupon: Coupon | RawCoupon) => {
  if ("availableTime" in coupon && coupon.availableTime) {
    const now = new Date();

    const [startHour, startMinute, startSecond] = coupon.availableTime.start
      .split(":")
      .map(Number);

    const [endHour, endMinute, endSecond] = coupon.availableTime.end
      .split(":")
      .map(Number);

    const startTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      startHour,
      startMinute,
      startSecond
    );

    const endTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      endHour,
      endMinute,
      endSecond
    );

    if (now < startTime || now > endTime) {
      return false;
    }
  }
  return true;
};

export const checkBuyQuantity = (coupon: BOGOCoupon, cartItems: CartItem[]) => {
  return (
    cartItems.filter(
      (cartItem) =>
        cartItem.isSelected &&
        cartItem.quantity >= coupon.buyQuantity + coupon.getQuantity
    ).length > 0
  );
};

export const checkApplicableCoupon = (
  coupon: Coupon | RawCoupon,
  { orderAmount, cartItems }: { orderAmount: number; cartItems: CartItem[] }
) => {
  if (isFixedDiscountCoupon(coupon)) {
    return isMetMinimumAmount(coupon, orderAmount) && isAvailableTime(coupon);
  }
  if (isPercentageDiscountCoupon(coupon)) {
    return isMetMinimumAmount(coupon, orderAmount) && isAvailableTime(coupon);
  }
  if (isFreeShippingCoupon(coupon)) {
    return (
      isMetMinimumAmount(coupon, orderAmount) &&
      isAvailableTime(coupon) &&
      orderAmount < MINIMUM_AMOUNT_FOR_FREE_DELIVERY
    );
  }
  if (isBOGOCoupon(coupon)) {
    return checkBuyQuantity(coupon, cartItems) && isAvailableTime(coupon);
  }
  return true;
};
