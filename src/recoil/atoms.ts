import { atom, atomFamily } from 'recoil';
import { CartItemInfo, ProductInfo } from '../types';

export const productListState = atom<ProductInfo[]>({
  key: 'productList',
  default: [],
});

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
