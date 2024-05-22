import { selector } from 'recoil';

import { fetchCouponList } from '@/apis/coupon';
import { Coupon } from '@/types/coupon';

export const couponListSelector = selector<Coupon[]>({
  key: 'couponListSelector',
  get: async () => {
    const couponList = await fetchCouponList();

    return couponList;
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});
