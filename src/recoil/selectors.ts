import { selector } from 'recoil';
import { cartData, cartItemCheckState } from './atoms';

export const allCartItemsCheckState = selector<boolean>({
  key: 'allCartItemsCheckState',
  get: ({ get }) => {
    const cart = get(cartData);
    return cart.every((cartItem) => get(cartItemCheckState(cartItem.id)));
  },
  set: ({ set, get }, newValue) => {
    const cart = get(cartData);
    cart.forEach((cartItem) => {
      set(cartItemCheckState(cartItem.id), newValue);
    });
  },
});
