import { atom } from 'recoil';

export const couponListState = atom<Coupon[]>({
  key: 'couponListState',
  default: [],
});

export const selectedCouponListState = atom<Coupon[]>({
  key: 'selectedCouponListState',
  default: [],
});
