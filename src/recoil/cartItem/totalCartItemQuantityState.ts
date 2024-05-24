import { selector } from 'recoil';
import { selectedCartItemListState } from '../selectedCartItemList/selectedCartItemList';

export const totalCartItemQuantityState = selector<number>({
  key: 'totalCartItemQuantityState',
  get: ({ get }) => {
    const selectedCartItemList = get(selectedCartItemListState);

    const totalQuantity = selectedCartItemList.reduce((totalQuantity, { quantity }) => totalQuantity + quantity, 0);

    return totalQuantity;
  },
});
