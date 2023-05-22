import { atom } from 'recoil';

import { CartItems } from '@customTypes/Product';

export const cartItemsState = atom<CartItems>({
  key: 'cartItemsState',
  default: {},
});

type CheckedCartItems = Record<string, number>;

export const checkedCartItemsState = atom<CheckedCartItems>({
  key: 'checkedCartItems',
  default: {},
});
