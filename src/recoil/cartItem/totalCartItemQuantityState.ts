import { selector } from 'recoil';
import { cartItemQuantityFamilyState } from './cartItemQuantityFamilyState';
import { selectedCartItemIdListState } from '../selectedCartItemIdList/selectedCartItemIdListState';

export const totalCartItemQuantitySelector = selector<number>({
  key: 'totalCartItemQuantitySelector',
  get: ({ get }) => {
    const selectedCartItemIdList = get(selectedCartItemIdListState);

    const totalQuantity = selectedCartItemIdList.reduce((totalQuantity, selectedCartItemId) => {
      const quantity = get(cartItemQuantityFamilyState(selectedCartItemId));

      return totalQuantity + quantity;
    }, 0);

    return totalQuantity;
  },
});
