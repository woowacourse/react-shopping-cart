import { atom, selector } from 'recoil';

import { CartItems } from '@customTypes/Product';

const cartItemsState = atom<CartItems>({
  key: 'cartItemsState',
  default: {},
});

export const cartItemsLengthSelector = selector({
  key: 'cartItemsLengthSelector',
  get: ({ get }) => Object.keys(get(cartItemsState)).length,
});

export default cartItemsState;
