import { selector } from 'recoil';
import { cartItemsState } from '../atoms/cartAtom';

export const cartItemsLengthSelector = selector({
  key: 'cartIdListLengthState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    return cartItems.length;
  },
});
