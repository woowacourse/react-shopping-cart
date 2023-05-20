import { selector } from 'recoil';

import cartItemsState from '@Atoms/cartItemsState';

import { SHOPPING_QUANTITY } from '@Constants/index';

const cartItemsAmountState = selector({
  key: 'cartItemsAmountState',

  get: ({ get }) => {
    const shoppingCart = get(cartItemsState);
    const shoppingCartAmount = shoppingCart ? shoppingCart.length : 0;

    if (shoppingCartAmount > SHOPPING_QUANTITY.MAX) return `${SHOPPING_QUANTITY.MAX}+`;
    return String(shoppingCartAmount);
  },
});

export default cartItemsAmountState;
