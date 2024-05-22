import { atom } from 'recoil';

export const applyCouponModalState = atom<boolean>({
  key: 'applyCouponModalState',
  default: false,
});
