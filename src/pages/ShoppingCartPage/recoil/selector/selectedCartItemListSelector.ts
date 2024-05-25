import { selectorFamily } from 'recoil';
import type { TCartItem } from '../../../../types/CartItem.type';
import { selectedCartItemListState } from '../atom/selectedCartItemListState';

export const selectedCartItemListSelector = selectorFamily<boolean, TCartItem>({
  key: 'selectedCartItemListSelector',
  get:
    (newItem: TCartItem) =>
    ({ get }) => {
      const selectedCartItemList = get(selectedCartItemListState);
      return selectedCartItemList.some((item) => item.id === newItem.id);
    },
  set:
    (newItem: TCartItem) =>
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
