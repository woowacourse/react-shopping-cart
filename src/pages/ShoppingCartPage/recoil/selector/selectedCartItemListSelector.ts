import { selectorFamily } from 'recoil';

import { selectedCartItemListState } from '../atom/selectedCartItemListState';

import type { CartItem } from '../../../../types/CartItem';
export const selectedCartItemListSelector = selectorFamily<boolean, CartItem>({
  key: 'selectedCartItemListSelector',
  get:
    (newItem: CartItem) =>
    ({ get }) => {
      const selectedCartItemList = get(selectedCartItemListState);
      return selectedCartItemList.some((item) => item.id === newItem.id);
    },
  set:
    (newItem: CartItem) =>
    ({ set, get }) => {
      const selectedCartItemList = get(selectedCartItemListState);

      if (!selectedCartItemList.some((item) => item.id === newItem.id)) {
        set(selectedCartItemListState, [...selectedCartItemList, newItem]);
      } else {
        set(
          selectedCartItemListState,
          selectedCartItemList.filter((item) => item.id !== newItem.id),
        );
      }
    },
});
