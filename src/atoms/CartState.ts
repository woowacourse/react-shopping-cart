import { atom, selector, selectorFamily } from 'recoil';
import { CartProductList } from '../types/productType';

const cartStateInit: CartProductList[] = [];

export const cartState = atom({
  key: 'CartState',
  default: cartStateInit,
});

export const cartStateLength = selector({
  key: 'CartStateLength',
  get: ({ get }) => {
    const cartStateLength = get(cartState).length;

    return cartStateLength;
  },
});

export const cartItemQuantityStateFamily = selectorFamily({
  key: 'CartItemQuantityStateFamily',
  get:
    (id: number) =>
    ({ get }) => {
      const cartItem = get(cartState).filter(
        (cartItem) => cartItem.id === id
      )[0];

      if (!cartItem) return 0;
      return cartItem.quantity;
    },
});

export const cartItemCheckedStateFamily = selectorFamily({
  key: 'CartItemCheckedStateFamily',
  get:
    (id: number) =>
    ({ get }) => {
      const cartItem = get(cartState).filter(
        (cartItem) => cartItem.id === id
      )[0];

      if (!cartItem) return false;
      return cartItem.checked;
    },
  set:
    (id: number) =>
    ({ set }) => {
      set(cartState, (prevStates) =>
        prevStates.map((cartItem) => {
          if (cartItem.id === id && !cartItem.checked) {
            return { ...cartItem, checked: true };
          } else if (cartItem.id === id && cartItem.checked) {
            return { ...cartItem, checked: false };
          }
          return { ...cartItem };
        })
      );
    },
});
