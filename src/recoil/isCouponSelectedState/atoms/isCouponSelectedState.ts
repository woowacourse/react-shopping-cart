import { atom } from 'recoil';

export const isCouponSelectedState = atom<boolean>({
  key: 'isCouponSelectedState',
  default: false,
});
