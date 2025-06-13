import { CouponType, DiscountType } from "../../../../../types/coupon";
import { CartItemType } from "../../../../../types/response";
import {
  isBuyXGetYCoupon,
  isFixedCoupon,
  isFreeShippingCoupon,
  isPercentageCoupon,
} from "./couponTypeGuards.domain";

type ValidatorParams = {
  type: DiscountType;
  coupon: CouponType;
  orderCost: number;
  cartItems: CartItemType[];
  selectedCoupon: CouponType[];
  deliveryCost: number;
};

type CouponValidator = (params: ValidatorParams) => boolean;

function isExpired({ coupon }: ValidatorParams): boolean {
  return !isAvailableDate(coupon.expirationDate);
}

function isOverLimit({ coupon, selectedCoupon }: ValidatorParams): boolean {
  return (
    selectedCoupon.length >= 2 &&
    !selectedCoupon.some((c) => c.code === coupon.code)
  );
}

function isOutOfTime({ coupon }: ValidatorParams): boolean {
  return (
    isPercentageCoupon(coupon) &&
    !isAvailableTime(coupon.availableTime.start, coupon.availableTime.end)
  );
}

function isOverQuantity({ coupon, cartItems }: ValidatorParams): boolean {
  if (!isBuyXGetYCoupon(coupon)) return false;

  return (
    cartItems.filter(
      (item) => item.quantity >= coupon.buyQuantity + coupon.getQuantity
    ).length === 0
  );
}

function isBelowMinimumAmount({ coupon, orderCost }: ValidatorParams): boolean {
  return (
    (isFixedCoupon(coupon) || isFreeShippingCoupon(coupon)) &&
    orderCost < coupon.minimumAmount
  );
}

function isZeroDeliveryCost({
  coupon,
  deliveryCost,
}: ValidatorParams): boolean {
  return isFreeShippingCoupon(coupon) && deliveryCost === 0;
}

function getCouponValidators(): CouponValidator[] {
  return [
    isExpired,
    isOverLimit,
    isOutOfTime,
    isOverQuantity,
    isBelowMinimumAmount,
    isZeroDeliveryCost,
  ];
}

export function isCouponDisabled(params: ValidatorParams): boolean {
  return getCouponValidators().some((validator) => validator(params));
}

function isAvailableDate(date: string) {
  const today = new Date();
  const couponDate = new Date(date);

  return couponDate > today;
}

function isAvailableTime(start: string, end: string) {
  const now = new Date();
  const startTime = new Date(now.toDateString() + " " + start);
  const endTime = new Date(now.toDateString() + " " + end);

  return now >= startTime && now <= endTime;
}
