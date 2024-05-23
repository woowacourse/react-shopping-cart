import { selector } from 'recoil';

import { fetchCouponSelector } from './fetchCouponSelector';

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
