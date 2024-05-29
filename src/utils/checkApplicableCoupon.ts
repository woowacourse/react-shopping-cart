import { MINIMUM_AMOUNT_FOR_FREE_DELIVERY } from "../constants/servicePolicy";
import { CartItem } from "../types/cartItems";
import {
  AvailableTime,
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

export const isAvailableTime = (availableTime: AvailableTime | undefined) => {
  if (!availableTime) {
    return true;
  }

  const now = new Date();

  const [startHour, startMinute, startSecond] = availableTime.start
    .split(":")
    .map(Number);

  const [endHour, endMinute, endSecond] = availableTime.end
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

  return startTime <= now && now <= endTime;
};

export const checkBuyQuantity = (coupon: BOGOCoupon, cartItems: CartItem[]) => {
  return cartItems.some(
    (cartItem) =>
      cartItem.isSelected &&
      cartItem.quantity >= coupon.buyQuantity + coupon.getQuantity
  );
};

export const checkApplicableCoupon = (
  coupon: Coupon | RawCoupon,
  { orderAmount, cartItems }: { orderAmount: number; cartItems: CartItem[] }
) => {
  if (isFixedDiscountCoupon(coupon)) {
    return (
      isMetMinimumAmount(coupon, orderAmount) &&
      isAvailableTime(coupon.availableTime)
    );
  }
  if (isPercentageDiscountCoupon(coupon)) {
    return (
      isMetMinimumAmount(coupon, orderAmount) &&
      isAvailableTime(coupon.availableTime)
    );
  }
  if (isFreeShippingCoupon(coupon)) {
    return (
      isMetMinimumAmount(coupon, orderAmount) &&
      isAvailableTime(coupon.availableTime) &&
      orderAmount < MINIMUM_AMOUNT_FOR_FREE_DELIVERY
    );
  }
  if (isBOGOCoupon(coupon)) {
    return (
      checkBuyQuantity(coupon, cartItems) &&
      isAvailableTime(coupon.availableTime)
    );
  }
  return true;
};
