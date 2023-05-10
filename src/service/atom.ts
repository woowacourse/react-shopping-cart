import { atom, selector } from 'recoil';
import type { CartItem } from '../types/types';

export const cartListState = atom<CartItem[]>({
  key: 'cartLists',
  default: [],
});

export const cartItemTotalQuantityState = selector({
  key: 'totalQuantity',
  get: ({ get }) => {
    const cartList = get(cartListState);

    return cartList.map((cartItem) => cartItem.quantity).reduce((prev, curr) => prev + curr, 0);
  },
});
