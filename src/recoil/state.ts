import type { CartType } from '../types';

import { atom, selector } from 'recoil';

import { localStorageEffect } from './effect';
import { LOCAL_STORAGE_KEY } from '../constants';

export const cartState = atom<CartType>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect(LOCAL_STORAGE_KEY.cart)],
});

export const cartCountState = selector({
  key: 'cartCountState',
  get: ({ get }) => get(cartState).length,
});

export const cartTotalPriceState = selector({
  key: 'cartTotalPriceState',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, { product, quantity }) => total + product.price * quantity, 0);
  },
});
