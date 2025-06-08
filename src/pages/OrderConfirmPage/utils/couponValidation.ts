import { CouponData, OrderItem } from "../types";

export interface CouponValidationResult {
  isValid: boolean;
  reason?: string;
  warningMessage?: string;
}

export function validateBasicCouponConditions(coupon: CouponData, orderAmount: number): CouponValidationResult {
  const now = new Date();

  const expirationDate = new Date(coupon.expirationDate);
  if (now > expirationDate) {
    return { isValid: false, reason: "만료된 쿠폰입니다." };
  }

  if (coupon.minimumAmount && orderAmount < coupon.minimumAmount) {
    const needed = coupon.minimumAmount - orderAmount;
    return {
      isValid: false,
      reason: `${needed.toLocaleString()}원 더 주문하면 사용할 수 있습니다.`,
    };
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
    const waitMinutes = startMinutes - nowMinutes;
    const waitHours = Math.floor(waitMinutes / 60);
    const waitMins = waitMinutes % 60;
    return {
      isValid: false,
      reason: `${waitHours > 0 ? `${waitHours}시간 ` : ""}${waitMins}분 후 사용 가능합니다.`,
    };
  }

  if (nowMinutes > endMinutes) {
    return {
      isValid: false,
      reason: "사용 가능한 시간이 지났습니다.",
    };
  }

  return { isValid: true };
}

// BOGO 쿠폰 적용 가능 여부 확인
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
    return {
      isValid: false,
      reason: "동일 상품을 2개 이상 구매해야 사용할 수 있습니다.",
    };
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
      return orderAmount < 100000 || (orderAmount >= 100000 && isIsolatedAreaSelected)
        ? {
            isValid: false,
            reason: "이미 무료 배송이 적용되어 있습니다.",
            warningMessage: "제주도 선택 시 사용 가능합니다.",
          }
        : { isValid: true };

    default:
      return { isValid: true };
  }
}
