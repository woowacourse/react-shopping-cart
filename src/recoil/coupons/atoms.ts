import { atom } from 'recoil';

import { couponCheckListSelector } from './selectors';

export const couponSavedCheckListState = atom({
  key: 'couponCheckList',
  default: couponCheckListSelector,
});

export const totalCouponDiscountState = atom({
  key: 'totalCouponDiscountState',
  default: 0,
});
