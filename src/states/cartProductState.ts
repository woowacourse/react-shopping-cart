import { atom, selector } from 'recoil';

import type { CartProduct } from '../types/product';

export const cartProductState = atom<CartProduct[]>({
  key: 'cartProductState',
  default: [],
});

export const cartProductCountState = selector<number>({
  key: 'cartProductCountState',
  get: ({ get }) => {
    const cartProducts = get(cartProductState);

    return cartProducts.length;
  },
});
