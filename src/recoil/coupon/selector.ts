import { selector, selectorFamily } from 'recoil';

import { couponsState } from './atom';

import { Coupon } from '@/types/coupon';

export const couponListSelector = selector({
  key: 'couponListSelector',
  get: ({ get }) => {
    const coupons = get(couponsState);

    return coupons;
  },
});

export const couponSelector = selectorFamily<Coupon | undefined, string>({
  key: 'couponSelector',
  get:
    (couponCode) =>
    ({ get }) => {
      const coupons = get(couponListSelector);

      return coupons.find(({ code }) => couponCode === code);
    },
});
