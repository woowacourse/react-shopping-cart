import { selector, selectorFamily } from 'recoil';

import { fetchProducts } from '../../../apis/products';
import { findTargetProduct } from '../util';
import { cartProductState } from '../atoms';

export const productSelector = selector({
  key: 'productSelector',
  get: async ({ get }) => {
    const data = await fetchProducts();
    return data;
  },
});

export const cartProductCountState = selector({
  key: 'cartProductCountState',
  get: ({ get }) => get(cartProductState).length,
});

export const targetCartProductState = selectorFamily({
  key: 'targetCartProductState',
  get:
    (id: number) =>
    ({ get }) =>
      findTargetProduct(get(cartProductState), id),
});
