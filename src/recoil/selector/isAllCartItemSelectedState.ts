import { selector } from 'recoil';

import cartItemsState from '@Atoms/cartItemsState';

const isAllCartItemSelectedState = selector({
  key: 'isAllCartItemSelectedState',

  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    if (!cartItems) return false;
    return cartItems.every((cartItem) => cartItem.isSelected);
  },
});

export default isAllCartItemSelectedState;
