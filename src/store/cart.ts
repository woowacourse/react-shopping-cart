import { atom, selectorFamily } from 'recoil';

import { CartItemType } from '../types';

export const cartListState = atom<CartItemType[]>({
  key: 'cartList',
  default: [],
});

export const cartItemQuantityState = selectorFamily({
  key: 'cartItemQuantity',
  get:
    (productId) =>
    ({ get }) => {
      const cartList = get(cartListState);

      return cartList.find((cartItem) => cartItem.product.id === productId);
    },
});
