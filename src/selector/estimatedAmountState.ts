import { selector } from 'recoil';

import shoppingCartState from '@Atoms/shoppingCartState';

const estimatedAmountState = selector({
  key: 'estimatedAmountState',

  get: ({ get }) => {
    const shoppingCart = get(shoppingCartState);

    return shoppingCart.reduce((a, b) => a + b.product.price * b.quantity, 0);
  },
});

export default estimatedAmountState;
