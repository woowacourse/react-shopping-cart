import { parseAvailableTime } from "@/utils/parser";

export const CART_FEE = {
  shippingFeeThreshold: 100_000,
  shippingFee: 3_000,
  remoteAreaShippingFee: 3_000,
} as const;

export const COUPONS = {
  maxCouponLengthThreshold: 2,
} as const;

export const COUPON_VALIDATION_MESSAGES = {
  unusableCoupon: "존재하지 않거나 유효 기간이 지난 쿠폰이에요.",
  invalidMinimumAmountCoupon: (minimumAmount: number) =>
    `${minimumAmount.toLocaleString()}원 이상 구매해야 사용할 수 있어요.`,
  invalidQuantityCoupon: (quantity: number) =>
    `${quantity}개 이상 구매해야 사용할 수 있어요.`,
  invalidTimeCoupon: (availableTime: { start: string; end: string }) =>
    `${parseAvailableTime(availableTime)} 사용할 수 있는 쿠폰이에요.`,
};
