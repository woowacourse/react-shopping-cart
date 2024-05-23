import { atom, selector } from 'recoil';
import { requestCouponList } from '../../apis/couponList';

export const couponListState = atom<Coupon[]>({
  key: 'couponListState',
  default: [],
});

export const couponListQuery = selector<Coupon[]>({
  key: 'couponListQuery',
  get: async () => {
    const result = await requestCouponList();
    return result;
  },
});

export const selectedCouponListAtom = atom<Coupon[]>({
  key: 'selectedCouponList',
  default: [],
});
