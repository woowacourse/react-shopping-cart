import { selector } from 'recoil';
import type { Coupon } from '../../types/coupon.type';
import { requestCouponList } from '../../apis/requests/couponList';

export const couponListStateQuery = selector<Coupon[]>({
  key: 'couponListStateQuery',
  get: async () => {
    const couponList = await requestCouponList();
    return couponList;
  },
});
