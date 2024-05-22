import { selector } from 'recoil';
import { selectedCartItemListState } from '../atoms/selectedCartItemListState';

export const selectedCartItemListTotalCountSelector = selector<number>({
  key: 'selectedCartItemListTotalCountSelector',
  get: ({ get }) => {
    const selectedCartItemList = get(selectedCartItemListState);
    return selectedCartItemList.reduce((acc, cur) => acc + cur.quantity, 0);
  },
});
