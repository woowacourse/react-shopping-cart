import {
  Coupon,
  DiscountType,
  FixedDiscountCoupon,
  FreeShippingCoupon,
  PercentageDiscountCoupon,
} from "../types";

export const isFixedDiscountCoupon = (coupon: Coupon): coupon is FixedDiscountCoupon => {
  return coupon.discountType === DiscountType.Fixed;
};

export const isFreeShippingCoupon = (coupon: Coupon): coupon is FreeShippingCoupon => {
  return coupon.discountType === DiscountType.FreeShipping;
};

export const isPercentageDiscountCoupon = (coupon: Coupon): coupon is PercentageDiscountCoupon => {
  return coupon.discountType === DiscountType.Percentage;
};

export const isMinimumAmountSatisfied = (coupon: Coupon, totalAmount: number) => {
  if (
    (isFixedDiscountCoupon(coupon) || isFreeShippingCoupon(coupon)) &&
    coupon.minimumAmount &&
    totalAmount < coupon.minimumAmount
  ) {
    return false;
  }
  return true;
};

export const isWithinAvailableTime = (coupon: Coupon, now: Date = new Date()) => {
  if (isPercentageDiscountCoupon(coupon) && coupon.availableTime) {
    const [startHour, startMinute, startSecond] = coupon.availableTime.start.split(":").map(Number);
    const [endHour, endMinute, endSecond] = coupon.availableTime.end.split(":").map(Number);

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

    return now >= startTime && now <= endTime;
  }
  return true;
};
