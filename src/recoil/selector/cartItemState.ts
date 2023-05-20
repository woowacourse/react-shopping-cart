import { selectorFamily } from 'recoil';

import cartItemsState from '@Atoms/cartItemsState';

import { SHOPPING_QUANTITY } from '@Constants/index';

const cartItemState = selectorFamily({
  key: 'cartItemState',

  get:
    (productId: number) =>
    ({ get }) => {
      const shoppingCart = get(cartItemsState);

      if (!shoppingCart) return { cartItemId: undefined, quantity: SHOPPING_QUANTITY.MIN };

      const shoppingItem = shoppingCart.find((item) => item.product.id === productId);

      if (shoppingItem) return { cartItemId: shoppingItem.id, quantity: shoppingItem.quantity };
      return { cartItemId: undefined, quantity: SHOPPING_QUANTITY.MIN };
    },
});

export default cartItemState;
