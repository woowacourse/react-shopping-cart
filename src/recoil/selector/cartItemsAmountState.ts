import { selector } from 'recoil';

import cartItemsState from '@Atoms/cartItemsState';

import { SHOPPING_QUANTITY } from '@Constants/index';

const cartItemsAmountState = selector({
  key: 'cartItemsAmountState',

  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const cartItemsAmount = cartItems ? cartItems.length : 0;

    if (cartItemsAmount > SHOPPING_QUANTITY.MAX) return `${SHOPPING_QUANTITY.MAX}+`;
    return String(cartItemsAmount);
  },
});

export default cartItemsAmountState;
