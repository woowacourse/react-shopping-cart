import { atom, selector, selectorFamily } from 'recoil';
import { CartProductItem } from '../types/productType';

const cartListStateInitValue: CartProductItem[] = [];

export const cartState = atom({
  key: 'CartState',
  default: cartListStateInitValue,
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
