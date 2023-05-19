import {
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import { localStorageEffect } from '../hooks/localStorageEffect';

import { CartItem } from '../types';

const CartState = atom<CartItem[]>({
  key: 'productsInCart',
  default: [],
  effects: [localStorageEffect('productsInCart')],
});

const CartSize = selector<number>({
  key: 'productsCartLength',
  get: ({ get }) => {
    const cart = get(CartState);

    return cart.length;
  },
});

const ProductInCart = selectorFamily<CartItem | null, number>({
  key: 'productInCart',
  get:
    (productId) =>
    ({ get }) => {
      const cart = get(CartState);

      const foundProduct = cart.find((item) => item.product.id === productId);

      return foundProduct || null;
    },
});

export const useCartState = () => useRecoilState(CartState);

export const useSetCartState = () => useSetRecoilState(CartState);

export const useCartSizeValue = () => useRecoilValue(CartSize);

export const useResetCartState = () => useResetRecoilState(CartState);

export const useProductInCartById = (productId: number) => useRecoilValue(ProductInCart(productId));
