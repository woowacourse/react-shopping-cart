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
  default: true,

  effects: (cartId) => [
    ({ setSelf, onSet }) => {
      const localStorageCheckedState = LocalStorage.getData(CART_ITEM, cartId);

      if (localStorageCheckedState) {
        setSelf(localStorageCheckedState);
      }

      onSet((isChecked, _, isReset) => {
        if (isReset) {
          LocalStorage.deleteData(CART_ITEM, cartId);
          return;
        }

        isChecked
          ? LocalStorage.addData(CART_ITEM, cartId, isChecked)
          : LocalStorage.deleteData(CART_ITEM, cartId);
      });
    },
  ],
});

export const isRemoteAreaState = atom<boolean>({
  key: 'isRemoteAreaState',
  default: false,
});
