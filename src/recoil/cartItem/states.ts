import { atomFamily, selector } from 'recoil';
import { selectedCartItemIdListAtom } from '../selectedCartItemIdList/states';

export const cartItemQuantityAtomFamily = atomFamily<number, number>({
  key: 'cartItemQuantityAtomFamily',
  default: 0,
});

export const totalCartItemQuantitySelector = selector<number>({
  key: 'totalCartItemQuantitySelector',
  get: ({ get }) => {
    const selectedCartItemIdList = get(selectedCartItemIdListAtom);

    const totalQuantity = selectedCartItemIdList.reduce((totalQuantity, selectedCartItemId) => {
      const quantity = get(cartItemQuantityAtomFamily(selectedCartItemId));

      return totalQuantity + quantity;
    }, 0);

    return totalQuantity;
  },
});
