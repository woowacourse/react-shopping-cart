import { atomFamily } from 'recoil';

export const cartItemQuantityState = atomFamily<number, number>({
  key: 'cartItemQuantityState',
  default: 0,
});
