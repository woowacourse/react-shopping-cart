import { atom, selector } from 'recoil';
import { Cart } from '../types/cart';

export const cartState = atom<Cart[]>({
  key: 'CartListState',
  default: [],
});

export const totalAmountState = selector({
  key: 'TotalAmountState',
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((acc, cur) => acc + cur.quantity, 0);
  },
});
