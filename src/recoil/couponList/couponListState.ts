import { atom, selector } from 'recoil';
import type { Coupon } from '../../types/coupon.type';
import { requestCouponList } from '../../apis/requests/couponList';

export const couponListState = atom<Coupon[]>({
  key: 'couponListState',
  default: [],
});

export const couponListStateQuery = selector<Coupon[]>({
  key: 'couponListStateQuery',
  get: async () => {
    const couponList = await requestCouponList();
    return couponList;
  },
  set: ({ set }, couponList) => {
    set(couponListState, couponList);
  },
});
