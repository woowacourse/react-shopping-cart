import { atom, selector } from 'recoil';
import { getDataFromLocalStorage } from '../utils/getAndSetDataInLocalStorage';
import { KEY_CART } from '../constants';
import { Product } from '../types';

export const productListState = atom<Product[]>({
  key: 'productListState',
  default: [],
});

export const cartState = atom({
  key: 'cartState',
  default: JSON.parse(getDataFromLocalStorage(KEY_CART) ?? '[]'),
});

export const cartBadgeSelector = selector({
  key: 'cartBadgeSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedProducts = new Set(cart);

    return selectedProducts;
  },
});
