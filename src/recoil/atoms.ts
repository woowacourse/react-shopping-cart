import { atom, atomFamily } from 'recoil';
import { CartItemInfo } from '../types';

export const cartListState = atom<CartItemInfo[]>({
  key: 'cartList',
  default: [],
});

export const checkedCartItemIdsState = atomFamily<number[], number[]>({
  key: 'checkedCartItemIds',
  default: (cartItemIds) => {
    return [...cartItemIds];
  },
});
