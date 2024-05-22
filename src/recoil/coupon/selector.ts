import { selector, selectorFamily } from 'recoil';

import { couponsState } from './atom';
import {
  calculateBuyXgetYDiscountSelector,
  calculateFixedDiscountSelector,
  calculateFreeShippingDiscountSelector,
  calculatePercentageDiscountSelector,
} from './calculateDiscountSelector';
import { orderTotalPriceState } from '../cartItems/selectors';

import { Coupon } from '@/types/coupon';
import { isCouponUsableTime, isCouponValid, isOverMinimumOrderAmount } from '@/utils/validations';

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

export const applicableCouponSelector = selectorFamily<boolean, string>({
  key: 'applicableCouponSelector',
  get:
    (couponCode) =>
    ({ get }) => {
      const coupon = get(couponSelector(couponCode));
      const totalAmount = get(orderTotalPriceState);

      if (!coupon || !isCouponValid(coupon)) return false;

      if (coupon.minimumAmount && !isOverMinimumOrderAmount(coupon, totalAmount)) return false;

      if (coupon.availableTime && !isCouponUsableTime(coupon)) return false;

      return true;
    },
});

export const calculateDiscountAmountSelector = selectorFamily<number, string>({
  key: 'calculateDiscountAmountSelector',
  get:
    (couponCode) =>
    ({ get }) => {
      const coupon = get(couponSelector(couponCode)) as Coupon;

      switch (coupon.discountType) {
        case 'fixed':
          return get(calculateFixedDiscountSelector(couponCode));
        case 'percentage':
          return get(calculatePercentageDiscountSelector(couponCode));
        case 'freeShipping':
          return calculateFreeShippingDiscountSelector(couponCode);
        case 'buyXgetY':
          return calculateBuyXgetYDiscountSelector(couponCode);
        default:
          return 0;
      }
    },
});
