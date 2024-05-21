import { atomFamily } from 'recoil';

export const cartItemQuantityFamilyState = atomFamily<number, number>({
  key: 'cartItemQuantityFamilyState',
  default: 0,
});
