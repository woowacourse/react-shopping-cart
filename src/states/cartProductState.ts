import { atom, selector, selectorFamily } from 'recoil';

import type { CartProduct } from '../types/product';

export const cartProductState = atom<CartProduct[]>({
  key: 'cartProductState',
  default: [],
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
