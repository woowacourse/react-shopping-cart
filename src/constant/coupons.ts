import {CouponCode, CouponKey} from '../type/coupon';

export const couponKeyToCode: Record<CouponKey, CouponCode> = {
  discount5000: 'FIXED5000',
  buy2get1: 'BOGO',
  freeShipping: 'FREESHIPPING',
  miracleSale: 'MIRACLESALE',
};

export const codeToCouponKey: Record<CouponCode, CouponKey> =
  Object.fromEntries(
    Object.entries(couponKeyToCode).map(([key, value]) => [value, key])
  ) as Record<CouponCode, CouponKey>;
