import { Coupon } from '../types/coupon';

export interface CouponValidationResult {
  isValid: boolean;
  reason?: string;
}

const isTimeInRange = (availableTime: {
  start: string;
  end: string;
}): boolean => {
  const now = new Date();
  const currentTime = now.getHours() * 100 + now.getMinutes();

  const startTime = parseInt(availableTime.start.replace(':', ''));
  const endTime = parseInt(availableTime.end.replace(':', ''));

  if (startTime > endTime) {
    return currentTime >= startTime || currentTime <= endTime;
  }

  return currentTime >= startTime && currentTime <= endTime;
};

export const isExpired = (expirationDate: string): boolean => {
  const expDate = new Date(expirationDate);
  const today = new Date();

  // 만료일의 자정(23:59:59)까지는 유효하므로, 다음날 00:00:00와 비교
  const expEndOfDay = new Date(expDate);
  expEndOfDay.setHours(23, 59, 59, 999);

  return today > expEndOfDay;
};

export const meetsMinimumAmount = (
  coupon: Coupon,
  cartAmount: number
): boolean => {
  switch (coupon.discountType) {
    case 'fixed':
      return cartAmount >= coupon.minimumAmount;
    case 'freeShipping':
      return cartAmount >= coupon.minimumAmount;
    default:
      return true; // percentage, buyXgetY는 최소 금액 조건 없음
  }
};

export const meetsTimeCondition = (coupon: Coupon): boolean => {
  if (coupon.availableTime) {
    return isTimeInRange(coupon.availableTime);
  }
  return true;
};

export const validateCoupon = (
  coupon: Coupon,
  cartAmount: number
): CouponValidationResult => {
  // 1. 만료일 체크
  if (isExpired(coupon.expirationDate)) {
    return {
      isValid: false,
      reason: '만료된 쿠폰입니다',
    };
  }

  if (!meetsMinimumAmount(coupon, cartAmount)) {
    const minimumAmount =
      coupon.discountType === 'fixed' || coupon.discountType === 'freeShipping'
        ? coupon.minimumAmount
        : 0;
    return {
      isValid: false,
      reason: `${minimumAmount.toLocaleString()}원 이상 주문 시 사용 가능`,
    };
  }

  if (!meetsTimeCondition(coupon)) {
    const timeCondition = coupon.availableTime
      ? `${coupon.availableTime.start}~${coupon.availableTime.end}`
      : '';
    return {
      isValid: false,
      reason: `${timeCondition} 시간에만 사용 가능`,
    };
  }

  return { isValid: true };
};
