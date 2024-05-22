import { atom } from 'recoil';

import { couponListSelector } from './fetchCouponSelector';

import { Coupon } from '@/types/coupon';

export const couponListState = atom<Coupon[]>({
  key: 'couponListState',
  default: couponListSelector,
});
