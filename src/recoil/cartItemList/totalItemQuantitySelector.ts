import { selector } from 'recoil';
import { cartItemListState } from './cartItemListSelector';
import { cartItemQuantityAtomFamily, cartItemSelectedIdListAtom } from '../cartItem/cartItemAtom';

export const totalItemQuantitySelector = selector({
  key: 'totalItemQuantitySelector',
  get: ({ get }) => {
    const cartItemList = get(cartItemListState);
    const cartItemSelectedIdList = get(cartItemSelectedIdListAtom);
    const filteredCartItemList = cartItemList.filter(({ cartItemId }) => cartItemSelectedIdList.includes(cartItemId));

    return filteredCartItemList.reduce((sum, { cartItemId }) => {
      const quantity = get(cartItemQuantityAtomFamily(`${cartItemId}`));

      return sum + quantity;
    }, 0);
  },
});
