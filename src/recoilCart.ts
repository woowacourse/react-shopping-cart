import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { localStorageEffect } from './hooks/localStorageEffect';

interface ProductInCart {
  id: number;
  quantity: number;
}

const CartState = atom<{ [key: ProductInCart['id']]: ProductInCart }>({
  key: 'productsInCart',
  default: {},
  effects: [localStorageEffect('productsInCart')],
});

const CartSize = selector({
  key: 'productsCartLength',
  get: ({ get }) => {
    const cart = get(CartState);

    return Object.keys(cart).length;
  },
});

export const useCartState = () => useRecoilState(CartState);

export const useSetCartState = () => useSetRecoilState(CartState);

export const useCartSizeValue = () => useRecoilValue(CartSize);
