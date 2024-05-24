import { selector } from 'recoil';

import { couponSavedCheckListState } from './atoms';
import { fetchCouponSelector } from './fetchCouponSelector';
import { checkedCartItemsState, orderResultState } from '../cartItems/selectors';

import couponDiscountCalculator from '@/components/Coupon/utils/couponDiscountCalculator';

export const couponCheckListSelector = selector({
  key: 'couponCheckListSelector',
  get: ({ get }) => {
    const couponList = get(fetchCouponSelector);
    return couponList.map((coupon) => ({
      ...coupon,
      isChecked: false,
    }));
  },
  set: ({ reset }) => {
    reset(couponSavedCheckListState);
  },
});

export const totalDiscountPriceState = selector({
  key: 'totalDiscountPriceState',
  get: ({ get }) => {
    const couponList = get(fetchCouponSelector);
    const checkedCartItems = get(checkedCartItemsState);
    const { totalOrderPrice } = get(orderResultState);
    const couponSavedCheckList = get(couponSavedCheckListState);

    if (!couponSavedCheckList) return 0;

    const { calculateDiscountAmount } = couponDiscountCalculator(couponList);
    return couponSavedCheckList.reduce((acc, coupon) => {
      if (coupon.isChecked) {
        return acc + calculateDiscountAmount(coupon, totalOrderPrice, checkedCartItems);
      }
      return acc;
    }, 0);
  },
});
