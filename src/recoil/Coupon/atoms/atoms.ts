import { atom } from 'recoil';

export const selectedCouponIdListState = atom<number[]>({
  key: 'selectedCouponIdListState',
  default: [],
});

export const totalDiscountPriceState = atom<number>({
  key: 'totalDiscountPriceState',
  default: 0,
});
