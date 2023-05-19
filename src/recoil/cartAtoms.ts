import { atom, selector } from 'recoil';
import { Cart } from '../types/types';

export const cartState = atom<Cart[]>({
  key: 'cartState',
  default: [],
});

export const cartCountSelector = selector({
  key: 'cartCountSelector',
  get: ({ get }) => {
    const cartList = get(cartState);
    return cartList.length;
  }
});
