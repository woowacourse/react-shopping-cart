import { selector } from 'recoil';

import cartItemsState from '@Atoms/cartItemsState';

const orderAmountState = selector({
  key: 'orderAmountState',

  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    if (!cartItems) return 0;

    return cartItems.reduce((acc, cur) => {
      if (!cur.isSelected) return acc;
      return acc + cur.quantity * cur.product.price;
    }, 0);
  },
});

export default orderAmountState;
