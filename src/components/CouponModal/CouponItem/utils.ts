import {
  BuyXGetYCoupon,
  CouponType,
  FixedCoupon,
  FreeShippingCoupon,
  PercentageCoupon,
} from "../../../types/coupon";

export function isFixedCoupon(coupon: CouponType): coupon is FixedCoupon {
  return coupon.discountType === "fixed";
}

export function isBuyXGetYCoupon(coupon: CouponType): coupon is BuyXGetYCoupon {
  return coupon.discountType === "buyXgetY";
}

export function isFreeShippingCoupon(
  coupon: CouponType
): coupon is FreeShippingCoupon {
  return coupon.discountType === "freeShipping";
}

export function isPercentageCoupon(
  coupon: CouponType
): coupon is PercentageCoupon {
  return coupon.discountType === "percentage";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)}부터 ${formatTime(end)}까지`;
}

function formatTime(time: string): string {
  const [hourStr] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const period = hour < 12 ? "오전" : "오후";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${period} ${displayHour}시`;
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
