import { selector } from 'recoil';
import { cartListState } from './atoms';

export const cartListLengthState = selector({
  key: 'cartListLength',
  get: ({ get }) => {
    const cartList = get(cartListState);
    return cartList.length;
  },
});
