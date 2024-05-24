import { atom } from 'recoil';
import type { Coupon } from '../../../types/Coupon.type';

export const selectedCouponListState = atom<Coupon[]>({
  key: 'selectedCouponIdListState',
  default: [],
});
