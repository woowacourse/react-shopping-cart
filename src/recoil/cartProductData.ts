import { atom, selector } from 'recoil';

import type { CartProduct } from '../types/product';

export const cartProductAtom = atom<CartProduct[]>({
  key: 'cartProductState',
  default: [],
});

export const totalCartProductSelect = selector<number>({
  key: 'totalCartProductState',
  get: ({ get }) => {
    const cartProducts = get(cartProductAtom);

    return cartProducts.length;
  },
});
