import { atom, selector } from 'recoil';

import type { CartType } from '../type/cart';
import { cartQuery } from '../api/api';

export const cartState = atom<CartType[]>({
  key: 'cartState',
  default: selector({
    key: 'cart/Default',
    get: () => cartQuery(),
  }),
});

export const totalCartCountState = selector({
  key: 'totalCartCountState',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.length;
  },
});
