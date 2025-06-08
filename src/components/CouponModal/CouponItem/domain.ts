import { CouponType, DiscountType } from "../../../types/coupon";
import { CartItemType } from "../../../types/response";

export function isCouponDisabled({
  type,
  coupon,
  orderCost,
  cartItems,
  selectedCoupon,
}: {
  type: DiscountType;
  coupon: CouponType;
  orderCost: number;
  cartItems: CartItemType[];
  selectedCoupon: DiscountType[];
}) {
  const isExpired = !isAvailableDate(coupon.expirationDate);
  const isOverLimit = isOverCouponLimit(type, selectedCoupon);
  const isOutOfTime = type === "percentage" && isCouponOutOfTime(coupon);
  const isOverQuantity =
    type === "buyXgetY" && isCouponOverQuantity(coupon, cartItems);
  const isBelowMinimumAmount =
    (type === "fixed" || type === "freeShipping") &&
    isCouponBelowMinimumAmount(coupon, orderCost);

  return (
    isExpired ||
    isOverLimit ||
    isOutOfTime ||
    isOverQuantity ||
    isBelowMinimumAmount
  );
}

export function isOverCouponLimit(
  type: DiscountType,
  selectedCoupon: DiscountType[]
) {
  return selectedCoupon.length >= 2 && !selectedCoupon.includes(type);
}

export function isCouponOutOfTime(coupon: CouponType): boolean {
  if ("availableTime" in coupon) {
    return !isAvailableTime(
      coupon.availableTime.start,
      coupon.availableTime.end
    );
  }
  return false;
}

export function isCouponOverQuantity(
  coupon: CouponType,
  cartItems: CartItemType[]
): boolean {
  if ("buyQuantity" in coupon && "getQuantity" in coupon) {
    return (
      cartItems.filter(
        (item) => item.quantity >= coupon.buyQuantity + coupon.getQuantity
      ).length === 0
    );
  }
  return false;
}

export function isCouponBelowMinimumAmount(
  coupon: CouponType,
  orderCost: number
): boolean {
  if ("minimumAmount" in coupon) {
    return orderCost < coupon.minimumAmount;
  }
  return false;
}

export function isAvailableDate(date: string) {
  const today = new Date();
  const couponDate = new Date(date);

  return couponDate > today;
}

export function isAvailableTime(start: string, end: string) {
  const now = new Date();
  const startTime = new Date(now.toDateString() + " " + start);
  const endTime = new Date(now.toDateString() + " " + end);

  return now >= startTime && now <= endTime;
}
