import { selectorFamily } from 'recoil';

import shoppingCartState from '@Atoms/shoppingCartState';

import { SHOPPING_QUANTITY } from '@Constants/index';

const cartItemState = selectorFamily({
  key: 'cartItemState',

  get:
    (productId: number) =>
    ({ get }) => {
      const shoppingCart = get(shoppingCartState);

      if (!shoppingCart) return { cartItemId: undefined, quantity: SHOPPING_QUANTITY.MIN };

      const shoppingItem = shoppingCart.find((item) => item.product.id === productId);

      if (shoppingItem) return { cartItemId: shoppingItem.id, quantity: shoppingItem.quantity };
      return { cartItemId: undefined, quantity: SHOPPING_QUANTITY.MIN };
    },
});

export default cartItemState;
