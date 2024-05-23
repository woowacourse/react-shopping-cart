import { selector } from 'recoil';

import { couponSavedCheckListState } from './atoms';
import { fetchCouponSelector } from './fetchCouponSelector';
import { orderResultState } from '../cartItems/selectors';

import discountCalculator from '@/components/Coupon/utils/couponDiscountCalculator';

export const couponCheckListSelector = selector({
  key: 'couponCheckListSelector',
  get: ({ get }) => {
    const couponList = get(fetchCouponSelector);
    return couponList.map((coupon) => ({
      ...coupon,
      isChecked: false,
    }));
  },
});

export const totalDiscountPriceState = selector({
  key: 'totalDiscountPriceState',
  get: ({ get }) => {
    const { totalOrderPrice } = get(orderResultState);
    const couponSavedCheckList = get(couponSavedCheckListState);
    const couponList = get(fetchCouponSelector);

    const { calculateDiscountAmount } = discountCalculator(couponList);
    return couponSavedCheckList.reduce((acc, coupon) => {
      if (coupon.isChecked) {
        return acc + calculateDiscountAmount(coupon, totalOrderPrice);
      }
      return acc;
    }, 0);
  },
});
