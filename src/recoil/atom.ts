import { atom } from 'recoil';

import { CartItems } from '@customTypes/Product';

export const cartItemsState = atom<CartItems>({
  key: 'cartItemsState',
  default: {},
});
