import { atom } from 'recoil';

import { fetchCoupons } from '@/apis/coupon';
import { Coupon } from '@/types/coupon';

export const couponsState = atom<Coupon[]>({
  key: 'couponsState',
  default: fetchCoupons(),
});

export const isCouponModalOpenState = atom<boolean>({
  key: 'isCouponModalOpenState',
  default: false,
});

export const selectedCouponsState = atom<string[]>({
  key: 'selectedCouponsState',
  default: [],
});

export const fixedSelectedCouponsState = atom<string[]>({
  key: 'fixedSelectedCouponsState',
  default: [],
});
