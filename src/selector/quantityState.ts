import { selectorFamily } from 'recoil';

import shoppingCartState from '@Atoms/shoppingCartState';

import { SHOPPING_QUANTITY } from '@Constants/index';

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
