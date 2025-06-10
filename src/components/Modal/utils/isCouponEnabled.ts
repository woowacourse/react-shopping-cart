import { Coupon, FixedCoupon, FreeShippingCoupon, PercentageCoupon, BuyXGetYCoupon } from '../../../types/coupon';
import { CartItemType } from '../../../types/cartItem';

function createCouponTypeGuard<T extends Coupon['discountType']>(type: T) {
  return (c: Coupon): c is Extract<Coupon, { discountType: T }> => c.discountType === type;
}

const isFixedCoupon = createCouponTypeGuard('fixed');
const isFreeShippingCoupon = createCouponTypeGuard('freeShipping');
const isPercentageCoupon = createCouponTypeGuard('percentage');
const isBuyXGetYCoupon = createCouponTypeGuard('buyXgetY');

function isExpired(coupon: Coupon, now: Date = new Date()): boolean {
  const today = now.toISOString().slice(0, 10);
  return today > coupon.expirationDate;
}

function isBelowMinimum(coupon: FixedCoupon | FreeShippingCoupon, orderAmount: number): boolean {
  return orderAmount < coupon.minimumAmount;
}

function isOutsideAvailableTime(coupon: PercentageCoupon, now: Date = new Date()): boolean {
  const [sh, sm, ss] = coupon.availableTime.start.split(':').map(Number);
  const [eh, em, es] = coupon.availableTime.end.split(':').map(Number);
  const toSec = (h: number, m: number, s: number) => h * 3600 + m * 60 + s;
  const nowSec = toSec(now.getHours(), now.getMinutes(), now.getSeconds());
  return nowSec < toSec(sh, sm, ss) || nowSec > toSec(eh, em, es);
}

function isInsufficientQuantity(coupon: BuyXGetYCoupon, items: CartItemType[]): boolean {
  const threshold = coupon.buyQuantity + coupon.getQuantity;
  return !items.some((item) => item.quantity >= threshold);
}

interface IsCouponEnabledProps {
  coupon: Coupon;
  orderAmount: number;
  items: CartItemType[];
  now?: Date;
}

export function isCouponEnabled({ coupon, orderAmount, items, now = new Date() }: IsCouponEnabledProps): boolean {
  if (isExpired(coupon, now)) {
    return false;
  }

  if ((isFixedCoupon(coupon) || isFreeShippingCoupon(coupon)) && isBelowMinimum(coupon, orderAmount)) {
    return false;
  }

  if (isPercentageCoupon(coupon) && isOutsideAvailableTime(coupon, now)) {
    return false;
  }

  if (isBuyXGetYCoupon(coupon) && isInsufficientQuantity(coupon, items)) {
    return false;
  }

  return true;
}
