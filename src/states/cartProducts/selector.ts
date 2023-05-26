import { selector, selectorFamily } from 'recoil';

import { findTargetProduct } from './util';
import { cartProductState } from './atom';

export const cartProductCountSelector = selector({
  key: 'cartProductCountSelector',
  get: ({ get }) => get(cartProductState).length,
});

export const targetCartProductSelector = selectorFamily({
  key: 'targetCartProductSelector',
  get:
    (id: number) =>
    ({ get }) =>
      findTargetProduct(get(cartProductState), id),
});
