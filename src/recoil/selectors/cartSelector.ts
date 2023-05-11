import { selector } from 'recoil';
import { cartAtom } from '@recoil/atoms/cartAtom';

export const cartItemLengthSelector = selector({
  key: 'cartItemLength',
  get: ({ get }) => {
    const cart = get(cartAtom);

    return cart.length;
  },
});
