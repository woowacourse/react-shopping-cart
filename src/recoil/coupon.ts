import { selector } from 'recoil';
import { fetchCoupons } from '../api';
import { CouponType } from '../types';

export const couponListSelector = selector<CouponType[]>({
  key: 'couponListSelector',
  get: async () => {
    return await fetchCoupons();
  },
});
