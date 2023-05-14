import { atom } from 'recoil';
import { localStorageEffect } from './hooks/localStorageEffect';

interface ProductInCart {
  id: number;
  quantity: number;
}

export const productsInCartState = atom<{ [key: ProductInCart['id']]: ProductInCart }>({
  key: 'productsInCart',
  default: {},
  effects: [localStorageEffect('productsInCart')],
});
