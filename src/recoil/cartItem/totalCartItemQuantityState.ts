import { selector } from 'recoil';
import { selectedCartItemListState } from '../selectedCartItemList/selectedCartItemList';

export const totalCartItemQuantitySelector = selector<number>({
  key: 'totalCartItemQuantitySelector',
  get: ({ get }) => {
    const selectedCartItemList = get(selectedCartItemListState);

    const totalQuantity = selectedCartItemList.reduce((totalQuantity, { quantity }) => totalQuantity + quantity, 0);

    return totalQuantity;
  },
});
