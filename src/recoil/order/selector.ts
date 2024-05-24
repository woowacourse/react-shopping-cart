import { selector } from 'recoil';

import { cartItemsState, checkedItemsState } from '../cartItems/atoms';

export const orderItemsIdSelector = selector({
  key: 'orderItemsIdSelector',
  get: ({ get }) => {
    const orderItems = get(cartItemsState).filter(({ id }) => get(checkedItemsState(id)));

    return orderItems.map(({ id }) => id);
  },
});
