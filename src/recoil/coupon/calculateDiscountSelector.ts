import { selectorFamily } from 'recoil';

import { applicableCouponSelector, couponSelector } from './selector';
import { orderTotalPriceState } from '../cartItems/selectors';

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

export const calculatePercentageDiscountSelector = selectorFamily<number, string>({
  key: 'calculatePercentageDiscountSelector',
  get:
    (couponCode) =>
    ({ get }) => {
      const coupon = get(couponSelector(couponCode)) as Coupon;
      const totalAmount = get(orderTotalPriceState);

      if (!get(applicableCouponSelector(coupon.code))) return 0;

      return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
    },
});
