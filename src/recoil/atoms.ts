import { CART_ITEM_SELECTED_STORAGE_KEY } from './../services/CartItemLocalStorage';
import { AtomEffect, atomFamily, selectorFamily } from 'recoil';
import CartItemLocalStorage from '../services/CartItemLocalStorage';
import { cartListState } from './selectors';

const cartItemQuantity = atomFamily<number, number>({
  key: 'cartItemQuantity',
  default: selectorFamily({
    key: 'initialCartItemQuantity',
    get:
      (id) =>
      ({ get }) => {
        const cartList = get(cartListState);
        const item = cartList.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },
  }),
});

const cartItemSelected = atomFamily<boolean, number>({
  key: 'cartItemSelected',
  default: (id: number) => {
    const storageState = CartItemLocalStorage.get(
      CART_ITEM_SELECTED_STORAGE_KEY
    );

    if (storageState) {
      return storageState[id];
    }
    return false;
  },
  effects: (id: number): AtomEffect<boolean>[] => [
    ({ onSet }) => {
      onSet((newValue) => {
        // storage 업데이트
        const storageState = CartItemLocalStorage.get(
          CART_ITEM_SELECTED_STORAGE_KEY
        );
        if (storageState) {
          storageState[id] = newValue;
          CartItemLocalStorage.set(
            CART_ITEM_SELECTED_STORAGE_KEY,
            storageState
          );
        }
      });
    },
  ],
});

export { cartItemQuantity, cartItemSelected };
