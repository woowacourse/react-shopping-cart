import { selector, selectorFamily } from 'recoil';
import type { TCartItem } from '../../types/CartItem.type';
import { selectedCartItemListState } from '../atoms/atoms';

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

export const selectedCartItemListTotalPriceSelector = selector<number>({
  key: 'selectedCartItemListTotalPriceSelector',
  get: ({ get }) => {
    const selectedCardItemList = get(selectedCartItemListState);
    return selectedCardItemList.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
  },
});

export const selectedCartItemListTotalCountSelector = selector<number>({
  key: 'selectedCartItemListTotalCountSelector',
  get: ({ get }) => {
    const selectedCardItemList = get(selectedCartItemListState);
    return selectedCardItemList.reduce((acc, cur) => acc + cur.quantity, 0);
  },
});
