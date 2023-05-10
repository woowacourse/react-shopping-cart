import { atom } from 'recoil';
import { localStorageEffect } from './hooks/localStorageEffect';

interface ProductInCart {
  id: number;
  quantity: number;
}

export const countInCartState = atom({
  key: 'countInCart',
  default: 0,
  effects: [localStorageEffect<number>('countInCart')],
});

export const productsInCartState = atom({
  key: 'productsInCart',
  default: [],
  effects: [localStorageEffect<ProductInCart[]>('productsInCart')],
});
