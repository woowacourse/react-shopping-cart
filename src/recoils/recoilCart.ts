import {
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { localStorageEffect } from './localStorageEffect';

import { CartItemType } from '../types';

import { LOCAL_STORAGE_KEY, RECOIL_KEY } from '../constants';

export const CartState = atom<CartItemType[]>({
  key: RECOIL_KEY.CART_STATE,
  default: [],
  effects: [localStorageEffect(LOCAL_STORAGE_KEY.CART_STATE)],
});

const CartSizeValue = selector<number>({
  key: RECOIL_KEY.CART_SIZE_VALUE,
  get: ({ get }) => {
    const cart = get(CartState);

    return cart.length;
  },
});

const CartItemValue = selectorFamily<CartItemType | null, number>({
  key: RECOIL_KEY.CART_ITEM_VALUE,
  get:
    (productId) =>
    ({ get }) => {
      const cart = get(CartState);
      const cartItem = cart.find((item) => item.product.id === productId);

      return cartItem || null;
    },
});

export const useCartState = () => useRecoilState(CartState);

export const useCartStateValue = () => useRecoilValue(CartState);

export const useSetCartState = () => useSetRecoilState(CartState);

export const useCartSizeValue = () => useRecoilValue(CartSizeValue);

export const useResetCartState = () => useResetRecoilState(CartState);

export const useCartItemValue = (productId: number) => useRecoilValue(CartItemValue(productId));
