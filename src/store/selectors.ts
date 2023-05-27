import { selector } from 'recoil';

import { CartItemType, ProductItemType } from '../types';
import { cartListState } from './cart';
import productListState from './product';

export const currentCartList = selector<CartItemType[]>({
  key: 'currentCartList',
  get: async ({ get }) => {
    const cartList = get(cartListState);
    if (cartList.length > 0) return cartList;
    const response = await fetch('/cart-items');
    if (!response.ok) throw new Error('장바구니 목록을 불러오지 못했습니다!');
    const currentCartList = await response.json();

    get(cartListState);
    return currentCartList;
  },
});

export const currentProductList = selector<ProductItemType[]>({
  key: 'currentProductList',
  get: async ({ get }) => {
    const productList = get(productListState);
    if (productList.length > 0) return productList;
    const response = await fetch('/products');
    if (!response.ok) throw new Error('상품 목록을 불러오지 못했습니다!');
    const currentProductList = await response.json();

    get(productListState);
    return currentProductList;
  },
});
