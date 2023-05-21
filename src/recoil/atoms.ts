import { atom, atomFamily, selector } from 'recoil';
import { CART_BASE_URL, PRODUCTS_BASE_URL } from '../constants';
import { CartItemInfo, ProductInfo } from '../types';

export const productListState = atom<ProductInfo[]>({
  key: 'productList',
  default: selector<ProductInfo[]>({
    key: 'productListDefault',
    get: async () => {
      const res = await fetch(PRODUCTS_BASE_URL);

      if (!res.ok) {
        throw new Error('상품 목록을 불러올 수 없습니다.');
      }

      const productList = await res.json();
      return productList;
    },
  }),
});

export const cartListState = atom<CartItemInfo[]>({
  key: 'cartList',
  default: selector<CartItemInfo[]>({
    key: 'cartListDefault',
    get: async () => {
      const res = await fetch(CART_BASE_URL);

      if (!res.ok) {
        throw new Error('장바구니 목록을 불러올 수 없습니다.');
      }

      const cartList = await res.json();
      return cartList;
    },
  }),
});

export const checkedCartItemIdsState = atomFamily<number[], number[]>({
  key: 'checkedCartItemIds',
  default: (cartItemIds) => {
    return [...cartItemIds];
  },
});
