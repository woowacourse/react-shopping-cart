import { selector } from 'recoil';
import { cartListState, checkedCartItemIdsState, productListState } from './atoms';
import { CartItemInfo, ProductInfo } from '../types';
import { CART_BASE_URL, PRODUCTS_BASE_URL } from '../constants';

export const currentProductListState = selector<ProductInfo[]>({
  key: 'currentProductList',
  get: async ({ get }) => {
    const productList = get(productListState); // selector에 의존성을 추가하기 위한 코드
    if (productList.length > 0) return productList;

    const res = await fetch(PRODUCTS_BASE_URL);

    if (!res.ok) throw new Error('상품 목록을 불러올 수 없습니다.');

    const currentProductList = await res.json();
    return currentProductList;
  },
});

export const currentCartListState = selector<CartItemInfo[]>({
  key: 'currentCartList',
  get: async ({ get }) => {
    const cartList = get(cartListState); // selector에 의존성을 추가하기 위한 코드
    if (cartList.length > 0) return cartList;

    const res = await fetch(CART_BASE_URL);
    if (!res.ok) throw new Error('장바구니 목록을 불러올 수 없습니다.');

    const currentCartList = await res.json();
    return currentCartList;
  },
});

export const cartListLengthState = selector({
  key: 'cartListLength',
  get: ({ get }) => {
    const cartList = get(currentCartListState);
    return cartList.length;
  },
});

export const totalProductsPriceState = selector({
  key: 'totalProductsPrice',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const cartItemIds = cartList.map((cartItem) => cartItem.id);
    const checkedCartItemIds = get(checkedCartItemIdsState(cartItemIds));

    const checkedCartItems = cartList.filter((cartItem) =>
      checkedCartItemIds.includes(cartItem.id)
    );

    const totalProductsPrice = checkedCartItems.reduce((total, cartItem) => {
      const quantity = cartItem.quantity;
      const price = cartItem.product.price;

      return total + quantity * price;
    }, 0);

    return totalProductsPrice;
  },
});
