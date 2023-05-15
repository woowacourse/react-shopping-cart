import { atom, selectorFamily } from 'recoil';

import { CART_LIST_LOCAL_STORAGE_KEY } from '../constants';
import { CartItemType } from '../types';

export const cartListState = atom<CartItemType[]>({
  key: 'cartList',
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const storeKey = CART_LIST_LOCAL_STORAGE_KEY;
      const savedValue = localStorage.getItem(storeKey);

      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(storeKey)
          : localStorage.setItem(storeKey, JSON.stringify(newValue));
      });
    },
  ],
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
