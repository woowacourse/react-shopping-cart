import { atom, selector, selectorFamily } from 'recoil';

import { localStorageEffect } from './atomEffects';

import { CART_STORAGE_ID } from '../constants/storage';
import type { CartProduct } from '../types/product';

export const cartProductState = atom<CartProduct[]>({
  key: 'cartProductState',
  default: [],
  effects: [localStorageEffect(CART_STORAGE_ID)],
});

export const cartProductCountState = selector({
  key: 'cartProductCountState',
  get: ({ get }) => {
    const cartProducts = get(cartProductState);

    return cartProducts.length;
  },
});

export const targetCartProductState = selectorFamily({
  key: 'targetCartProductState',
  get:
    (id: number) =>
    ({ get }) =>
      get(cartProductState).find(
        (cartProduct) => id === cartProduct.product.id
      ),
});
