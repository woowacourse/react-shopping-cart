import { atom } from 'recoil';

export const selectedCouponIdListState = atom<number[]>({
  key: 'selectedCouponIdListState',
  default: [],
});
