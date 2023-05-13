import { selector, selectorFamily } from 'recoil';

import { cartProductState } from '../atoms';

export const cartProductCountState = selector({
  key: 'cartProductCountState',
  get: ({ get }) => {
    const cartProducts = get(cartProductState);

    return cartProducts.length;
  },
});

export const targetCartProductState = selectorFamily({
  key: 'targetCartProductState',
  get:
    (id: number) =>
    ({ get }) =>
      get(cartProductState).find(
        (cartProduct) => id === cartProduct.product.id
      ),
});
