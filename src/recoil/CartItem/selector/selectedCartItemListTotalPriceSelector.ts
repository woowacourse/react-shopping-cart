import { selector } from 'recoil';
import { selectedCartItemListState } from '../atom/selectedCartItemListState';

export const selectedCartItemListTotalPriceSelector = selector<number>({
  key: 'selectedCartItemListTotalPriceSelector',
  get: ({ get }) => {
    const selectedCartItemList = get(selectedCartItemListState);
    return selectedCartItemList.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
  },
});
