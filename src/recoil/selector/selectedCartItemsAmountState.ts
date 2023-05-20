import { selector } from 'recoil';

import cartItemsState from '@Atoms/cartItemsState';

const selectedCartItemsAmountState = selector({
  key: 'selectedCartItemsAmountState',

  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    if (!cartItems) return 0;
    return cartItems.reduce((acc, cur) => {
      if (!cur.isSelected) return acc;
      return acc + 1;
    }, 0);
  },
});

export default selectedCartItemsAmountState;
