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

export const cartQuantityState = selector({
  key: 'cartQuantity',
  get: ({ get }) => {
    const cartQuantities = get(cartState).map((cartItem) => cartItem.quantity);

    return cartQuantities;
  },
});

export const cartItemQuantityStateFamily = selectorFamily({
  key: 'CartItemQuantityStateFamily',
  get:
    (id) =>
    ({ get }) => {
      const cartItemQuantity = get(cartState).filter(
        (cartItem) => cartItem.id === id
      )[0];

      return cartItemQuantity;
    },
});
