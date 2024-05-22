import { selector } from 'recoil';
import { cartItemListState } from '../cartItemList/cartItemListState';
import { selectedCartItemIdListState } from './selectedCartItemIdListState';

export const selectedCartItemListState = selector({
  key: 'selectedCartItemListState',
  get: ({ get }) => {
    const cartItemList = get(cartItemListState);
    const selectedCartItemIdList = get(selectedCartItemIdListState);

    const selectedCartItemList = cartItemList.filter(({ cartItemId }) => selectedCartItemIdList.includes(cartItemId));

    return selectedCartItemList;
  },
});
