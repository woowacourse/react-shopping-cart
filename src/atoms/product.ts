import { Product } from './../types/product';
import { selector, selectorFamily } from 'recoil';
import mockData from '../data/mockProducts.json';
import { cartState } from './cart';

export const fetchProductSelector = selector({
  key: 'FetchProductSelector',
  get: async () => {
    const products = mockData as Product[];

    return products;
  },
});

export const cartQuantityReadOnlyState = selectorFamily({
  key: 'cartQuantityReadOnlyState',
  get:
    (id) =>
    ({ get }) => {
      const quantity = get(cartState).find(({ product }) => product.id === id)?.quantity;

      return quantity || 0;
    },
});
