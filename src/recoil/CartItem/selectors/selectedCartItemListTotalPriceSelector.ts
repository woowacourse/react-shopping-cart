import { selector } from 'recoil';

import { selectedCartItemListState } from '../atoms/selectedCartItemListState';
import { selectedCartItemTotalPriceState } from '../atoms/selectedCartItemTotalPriceState';

export const selectedCartItemListTotalPriceSelector = selector<number>({
  key: 'selectedCartItemListTotalPriceSelector',
  get: ({ get }) => {
    const cartItems = get(selectedCartItemListState);
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },
  set: ({ set, get }) => {
    const cartItems = get(selectedCartItemListState);
    const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    set(selectedCartItemTotalPriceState, totalPrice);
  },
});
