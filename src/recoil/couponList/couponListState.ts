import { atom } from 'recoil';
import type { Coupon } from '../../types/coupon.type';
import { requestCouponList } from '../../apis/requests/coupon';

export const couponListState = atom<Coupon[]>({
  key: 'couponListState',
  default: requestCouponList(),
});
