import { selector } from 'recoil';

import shoppingCartState from '@Atoms/shoppingCartState';

import { SHOPPING_QUANTITY } from '@Constants/index';

const shoppingCartAmountState = selector({
  key: 'shoppingCartAmountState',

  get: ({ get }) => {
    const shoppingCart = get(shoppingCartState);
    const shoppingCartAmount = shoppingCart ? shoppingCart.length : 0;

    if (shoppingCartAmount > SHOPPING_QUANTITY.MAX) return `${SHOPPING_QUANTITY.MAX}+`;
    return String(shoppingCartAmount);
  },
});

export default shoppingCartAmountState;
