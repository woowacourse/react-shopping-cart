import { selector } from 'recoil';

import { fetchCouponList } from '@/apis/coupon';
import { Coupon } from '@/types/coupon';

export const fetchCouponSelector = selector<Coupon[]>({
  key: 'fetchCouponSelector',
  get: async () => {
    const couponList = await fetchCouponList();

    return couponList;
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});
