import { selector } from 'recoil';

import { CartItemType } from '../types';
import { cartListState } from './cart';

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
  set: async ({ set }, newValue) => set(cartListState, newValue),

  // const storeKey = CART_LIST_LOCAL_STORAGE_KEY;
  // const savedValue = localStorage.getItem(storeKey);

  // if (savedValue !== null) {
  //   setSelf(JSON.parse(savedValue));
  // }

  // onSet((newValue, _, isReset) => {
  //   isReset
  //     ? localStorage.removeItem(storeKey)
  //     : localStorage.setItem(storeKey, JSON.stringify(newValue));
  // });
});
