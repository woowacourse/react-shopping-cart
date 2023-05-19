import { atom, selector } from 'recoil';

import type { CartProduct } from '../types/product';
import { fetchCartProducts } from '../apis/cartProducts';

export const cartProductAtom = atom<CartProduct[]>({
  key: 'cartProductState',
  default: selector({
    key: 'cartProductState/Default',
    get: async () => {
      const response = await fetchCartProducts();
      return response;
    },
  }),
});

export const totalCartProductSelect = selector<number>({
  key: 'totalCartProductState',
  get: ({ get }) => {
    const cartProducts = get(cartProductAtom);

    return cartProducts.length;
  },
});
