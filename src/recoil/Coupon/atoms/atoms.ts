import { atom } from 'recoil';
import { Coupon } from '../../../types/Coupon.type';

export const selectedCouponListState = atom<Coupon[]>({
  key: 'couponListState',
  default: [],
});
