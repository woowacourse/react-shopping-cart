import { selectorFamily } from 'recoil';

import { applicableCouponSelector, couponSelector } from './selector';

import { Coupon } from '@/types/coupon';

export const calculateFixedDiscountSelector = selectorFamily<number, string>({
  key: 'calculateFixedDiscountSelector',
  get:
    (couponCode) =>
    ({ get }) => {
      const coupon = get(couponSelector(couponCode)) as Coupon;

      if (!get(applicableCouponSelector(coupon.code))) return 0;

      return coupon.discount ?? 0;
    },
});
