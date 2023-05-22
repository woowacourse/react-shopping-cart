import { selector } from 'recoil';

import cartItemsState from '@Atoms/cartItemsState';

const isAllCartItemSelectedState = selector({
  key: 'isAllCartItemSelectedState',

  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    if (!cartItems) return { isAllCartItemSelected: false, isAllCartItemUnSelected: false };
    const isAllCartItemSelected = cartItems.every((cartItem) => cartItem.isSelected);
    const isAllCartItemUnSelected = cartItems.every((cartItem) => !cartItem.isSelected);

    return { isAllCartItemSelected, isAllCartItemUnSelected };
  },
});

export default isAllCartItemSelectedState;
