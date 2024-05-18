import { atom, atomFamily, selector } from 'recoil';

import { fetchCartItems } from '@/apis/cartItem';
import LocalStorage, { CART_ITEM } from '@/Storage';
import { CartItemProps } from '@/types/cartItem';

export const fetchCartItemsSelector = selector<CartItemProps[]>({
  key: 'fetchCartItemsSelector',
  get: async () => {
    const cartItems = await fetchCartItems();

    return cartItems;
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const cartItemsState = atom<CartItemProps[]>({
  key: 'cartItemsState',
  default: fetchCartItemsSelector,
});

export const checkedItemsState = atomFamily<boolean, number>({
  key: 'checkedItemsState',
  default: (cartId) => {
    return LocalStorage.getData(CART_ITEM, cartId) ?? true;
  },
  effects: (cartId) => [
    ({ setSelf, onSet }) => {
      const storageCheckedState = LocalStorage.getData(CART_ITEM, cartId);
      if (storageCheckedState) {
        setSelf(storageCheckedState);
      }

      onSet((newQuantity) => {
        LocalStorage.addData(CART_ITEM, cartId, newQuantity);
      });
    },
  ],
});
