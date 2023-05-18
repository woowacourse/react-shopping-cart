import { selector } from 'recoil';
import { cartItemsState } from './atom';

export const cartItemsLengthSelector = selector({
  key: 'cartItemsLengthSelector',
  get: ({ get }) => Object.keys(get(cartItemsState)).length,
});

// product-id 뱉는 셀렉터
export const productIdsSelector = selector({
  key: 'productIdsSelector',
  get: ({ get }) =>
    Object.values(get(cartItemsState)).map(cartItem => cartItem.productId),
});

// cart-item-id 뱉는 셀렉터

// quantity 뱉는 셀렉터
