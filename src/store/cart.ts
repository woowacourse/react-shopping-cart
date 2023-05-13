import { atom, selector, selectorFamily } from 'recoil';

import { CART_LIST_LOCAL_STORAGE_KEY } from '../constants';
import { CartItemData } from '../types';

const cartListState = atom<CartItemData[]>({
  key: 'cartList',
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const savedValue = localStorage.getItem(CART_LIST_LOCAL_STORAGE_KEY);

      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(CART_LIST_LOCAL_STORAGE_KEY)
          : localStorage.setItem(CART_LIST_LOCAL_STORAGE_KEY, JSON.stringify(newValue));
      });
    },
  ],
});

const cartListItemCountState = selector({
  key: 'cartListItemCount',
  get: ({ get }) => get(cartListState).length,
});

const cartItemQuantityState = selectorFamily({
  key: 'cartItemQuantity',
  get:
    (productId) =>
    ({ get }) => {
      const cartList = get(cartListState);

      return cartList.find((cartItem) => cartItem.productId === productId)?.quantity;
    },
});

export { cartListItemCountState, cartListState, cartItemQuantityState };
