import { CouponData, OrderItem } from "../types";
import { canApplyShippingCoupon } from "./shippingCalculations";

export interface CouponValidationResult {
  isValid: boolean;
}
export function validateBasicCouponConditions(coupon: CouponData, orderAmount: number): CouponValidationResult {
  const now = new Date();

  const expirationDate = new Date(coupon.expirationDate);
  if (now > expirationDate) {
    return { isValid: false };
  }

  if (coupon.minimumAmount && orderAmount < coupon.minimumAmount) {
    return { isValid: false };
  }

  if (coupon.availableTime) {
    const timeValidation = validateTimeCondition(coupon.availableTime);
    if (!timeValidation.isValid) {
      return timeValidation;
    }
  }

  return { isValid: true };
}

function validateTimeCondition(availableTime: { start: string; end: string }): CouponValidationResult {
  const now = new Date();
  const nowHour = now.getHours();
  const nowMin = now.getMinutes();
  const [startH, startM] = availableTime.start.split(":").map(Number);
  const [endH, endM] = availableTime.end.split(":").map(Number);

  const nowMinutes = nowHour * 60 + nowMin;
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  if (nowMinutes < startMinutes) {
    return { isValid: false };
  }

  if (nowMinutes > endMinutes) {
    return { isValid: false };
  }

  return { isValid: true };
}

function validateBogoCondition(orderItems: OrderItem[]): CouponValidationResult {
  const productQuantities = orderItems.reduce(
    (acc, item) => {
      acc[item.product.id] = (acc[item.product.id] || 0) + item.quantity;
      return acc;
    },
    {} as Record<number, number>,
  );

  const hasEligibleProducts = Object.values(productQuantities).some((quantity) => quantity >= 2);

  if (!hasEligibleProducts) {
    return { isValid: false };
  }

  return { isValid: true };
}

export function validateCouponUsage({
  coupon,
  orderItems,
  orderAmount,
  isIsolatedAreaSelected,
}: {
  coupon: CouponData;
  orderItems: OrderItem[];
  orderAmount: number;
  isIsolatedAreaSelected: boolean;
}): CouponValidationResult {
  const basicValidation = validateBasicCouponConditions(coupon, orderAmount);
  if (!basicValidation.isValid) {
    return basicValidation;
  }

  switch (coupon.discountType) {
    case "buyXgetY":
      return validateBogoCondition(orderItems);

    case "freeShipping":
      return validateShippingCoupon(orderAmount, isIsolatedAreaSelected);

    default:
      return { isValid: true };
  }
}

function validateShippingCoupon(orderAmount: number, isIsolatedAreaSelected: boolean): CouponValidationResult {
  if (!canApplyShippingCoupon(orderAmount, isIsolatedAreaSelected)) {
    return { isValid: false };
  }

  return { isValid: true };
}
