import { atom, atomFamily } from 'recoil';

import LocalStorage, { CART_ITEM } from '@/Storage';
import { CartItemProps } from '@/types/cartItem';
import { fetchCartItems } from '@apis/cartItem';

export const cartItemsState = atom<CartItemProps[]>({
  key: 'cartItemsState',
  default: fetchCartItems(),
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
