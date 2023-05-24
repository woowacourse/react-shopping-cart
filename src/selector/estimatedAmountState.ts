import { selectorFamily } from 'recoil';

import shoppingCartState from '@Atoms/shoppingCartState';

const estimatedAmountState = selectorFamily({
  key: 'estimatedAmountState',

  get:
    (productsId: number[]) =>
    ({ get }) => {
      const shoppingCart = get(shoppingCartState);

      return shoppingCart
        .filter((item) => productsId.includes(item.id))
        .reduce((a, b) => a + b.product.price * b.quantity, 0);
    },
});

export default estimatedAmountState;
