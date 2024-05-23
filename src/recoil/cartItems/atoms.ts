import { atom, atomFamily, selector } from 'recoil';

import LocalStorage, { CART_ITEM } from '@/Storage';
import { CartItemProps } from '@/types/cartItem';
import { fetchCartItems } from '@apis/cartItem';

const cartItemSelector = selector({
  key: 'getCartItems',
  get: async () => {
    const cartItems = await fetchCartItems();

    return cartItems;
  },
});

export const cartItemsState = atom<CartItemProps[]>({
  key: 'cartItemsState',
  default: cartItemSelector,
});

export const checkedItemsState = atomFamily<boolean, number>({
  key: 'checkedItemsState',
  default: (cartId) => {
    return LocalStorage.getData(CART_ITEM, cartId) ?? true;
  },
});

export const isRemoteAreaState = atom<boolean>({
  key: 'isRemoteAreaState',
  default: false,
});
