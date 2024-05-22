import { atom } from 'recoil';
import { Coupon } from '../../types/coupon.type';

export const selectedCouponListState = atom<Coupon[]>({
  key: 'selectedCouponListState',
  default: [],
});
