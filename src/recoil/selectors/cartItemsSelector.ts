import { selector } from 'recoil';
import { cartItemsState } from '../atoms/cartAtom';

export const cartItemsSelector = selector({
  key: 'cartItemsSelector',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const isCartItemsEmpty = cartItems.length === 0;
    const cartItemsLength = cartItems.length;

    return { isCartItemsEmpty, cartItemsLength };
  },
});
