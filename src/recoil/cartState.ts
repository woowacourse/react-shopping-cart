import { atom, selector } from 'recoil';

import { Cart } from '@customTypes/Product';

const cartState = atom<Cart[]>({
  key: 'cartState',
  default: [],
});

export const cartLengthSelector = selector({
  key: 'cartLengthSelector',
  get: ({ get }) => get(cartState).length,
});

export default cartState;
