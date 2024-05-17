import { atomFamily } from 'recoil';

export const cartItemQuantityAtom = atomFamily<number, number>({
  key: 'cartItemQuantity',
  default: 0,
});
