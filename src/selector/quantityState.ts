import { selectorFamily } from 'recoil';

import { SHOPPING_QUANTITY } from '@Constants/index';

import shoppingCartState from '@Atoms/shoppingCartState';

const quantityState = selectorFamily({
  key: 'quantityState',

  get:
    (productId: number) =>
    ({ get }) => {
      const shoppingCart = get(shoppingCartState);

      const shoppingItem = shoppingCart.find((item) => item.product.id === productId);

      if (shoppingItem) return shoppingItem.quantity;
      return SHOPPING_QUANTITY.MIN;
    },
});

export default quantityState;
