import { selectorFamily } from 'recoil';

import cartItemsState from '@Atoms/cartItemsState';

const isCartItemSelectedState = selectorFamily({
  key: 'isCartItemSelectedState',

  get:
    (id: number) =>
    ({ get }) => {
      const cartItems = get(cartItemsState);

      if (!cartItems) return false;

      const cartItem = cartItems.find((cartItem) => cartItem.id === id);
      if (!cartItem) return false;

      return cartItem.isSelected;
    },
});

export default isCartItemSelectedState;
