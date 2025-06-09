import { Coupon, FixedCoupon, FreeShippingCoupon, PercentageCoupon, BuyXGetYCoupon } from '../../types/coupon';
import { CartItemType } from '../../types/cartItem';

/** 타입 가드들 */
function isFixedCoupon(c: Coupon): c is FixedCoupon {
  return c.discountType === 'fixed';
}
function isFreeShippingCoupon(c: Coupon): c is FreeShippingCoupon {
  return c.discountType === 'freeShipping';
}
function isPercentageCoupon(c: Coupon): c is PercentageCoupon {
  return c.discountType === 'percentage';
}
function isBuyXGetYCoupon(c: Coupon): c is BuyXGetYCoupon {
  return c.discountType === 'buyXgetY';
}

/** 1) 만료 여부 */
function isExpired(coupon: Coupon, now: Date = new Date()): boolean {
  const today = now.toISOString().slice(0, 10); // "YYYY-MM-DD"
  return today > coupon.expirationDate;
}

/** 2) 최소 주문 금액 미달 (fixed, freeShipping) */
function isBelowMinimum(coupon: FixedCoupon | FreeShippingCoupon, orderAmount: number): boolean {
  return orderAmount < coupon.minimumAmount;
}

/** 3) 사용 가능 시간 범위 벗어남 (percentage) */
function isOutsideAvailableTime(coupon: PercentageCoupon, now: Date = new Date()): boolean {
  const [sh, sm, ss] = coupon.availableTime.start.split(':').map(Number);
  const [eh, em, es] = coupon.availableTime.end.split(':').map(Number);
  const toSec = (h: number, m: number, s: number) => h * 3600 + m * 60 + s;
  const nowSec = toSec(now.getHours(), now.getMinutes(), now.getSeconds());
  return nowSec < toSec(sh, sm, ss) || nowSec > toSec(eh, em, es);
}

/** 4) Buy X Get Y 조건 미충족: 모든 아이템 수량 < X+Y */
function isInsufficientQuantity(coupon: BuyXGetYCoupon, items: CartItemType[]): boolean {
  const threshold = coupon.buyQuantity + coupon.getQuantity;
  return !items.some((item) => item.quantity >= threshold);
}

/**
 * 쿠폰 사용 불가능 여부 판단
 */
export function isCouponDisabled(
  coupon: Coupon,
  orderAmount: number,
  items: CartItemType[],
  now: Date = new Date()
): boolean {
  if (isExpired(coupon, now)) {
    return true;
  }

  if ((isFixedCoupon(coupon) || isFreeShippingCoupon(coupon)) && isBelowMinimum(coupon, orderAmount)) {
    return true;
  }

  if (isPercentageCoupon(coupon) && isOutsideAvailableTime(coupon, now)) {
    return true;
  }

  if (isBuyXGetYCoupon(coupon) && isInsufficientQuantity(coupon, items)) {
    return true;
  }

  return false;
}
