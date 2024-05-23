import { atom } from 'recoil';

import { coupons } from '@/mocks/coupons';
import { Coupon } from '@/types/coupon';

export const couponsState = atom<Coupon[]>({
  key: 'couponsState',
  default: coupons,
});

export const isCouponModalOpenState = atom<boolean>({
  key: 'isCouponModalOpenState',
  default: false,
});

export const selectedCouponsState = atom<string[]>({
  key: 'selectedCouponsState',
  default: [],
});
