import { selector, selectorFamily } from 'recoil';

import { couponsState, fixedSelectedCouponsState, selectedCouponsState } from './atom';
import {
  checkedItemsSelector,
  deliveryPriceState,
  orderTotalPriceState,
} from '../cartItems/selectors';

import { MAX_SELECTED_COUPON_LENGTH } from '@/constants/coupon';
import { Coupon } from '@/types/coupon';
import calculateDiscountAmount from '@/utils/\bcalculateDiscountAmount';
import permute from '@/utils/permute';
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

export const isMaxSelectedCouponsSelector = selector({
  key: 'isMaxSelectedCouponsSelector',
  get: ({ get }) => {
    const selectedCoupons = get(selectedCouponsState);

    return selectedCoupons.length === MAX_SELECTED_COUPON_LENGTH;
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

export const calculateTotalDiscountAmountSelector = selectorFamily<number, boolean>({
  key: 'calculateTotalDiscountAmountSelector',
  get:
    (fixed) =>
    ({ get }) => {
      const selectedCoupons = fixed ? get(fixedSelectedCouponsState) : get(selectedCouponsState);
      const couponPermutations = permute(selectedCoupons);
      const deliveryPrice = get(deliveryPriceState);
      const checkedItems = get(checkedItemsSelector);
      const couponResults: number[] = [];

      couponPermutations.forEach((couponCodes) => {
        let orderTotalPrice = get(orderTotalPriceState);

        const discountAmounts = couponCodes.map((code) => {
          const coupon = get(couponSelector(code)) as Coupon;
          const isCouponApplicable = get(applicableCouponSelector(code));

          if (!isCouponApplicable) return 0;

          const discountAmount = calculateDiscountAmount(
            coupon,
            orderTotalPrice,
            deliveryPrice,
            checkedItems,
          );

          orderTotalPrice -= discountAmount;

          return discountAmount;
        });

        const discountTotalAmount = discountAmounts.reduce(
          (discountTotalAmount, discountAmount) => discountTotalAmount + discountAmount,
          0,
        );

        couponResults.push(discountTotalAmount);
      });

      return couponResults.length ? Math.max(...couponResults) : 0;
    },
});
