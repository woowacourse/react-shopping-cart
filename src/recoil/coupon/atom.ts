import { atom } from 'recoil';

import { coupons } from '@/mocks/coupons';
import { Coupon } from '@/types/coupon';

export const couponsState = atom<Coupon[]>({
  key: 'couponsState',
  default: coupons,
});
