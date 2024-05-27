import { selector } from 'recoil';
import { cartItemListState } from './cartItemListSelector';
import { cartItemQuantityAtomFamily, cartItemSelectedIdListAtom } from '../cartItem/cartItemAtom';

export const totalItemQuantitySelector = selector({
  key: 'totalItemQuantitySelector',
  get: ({ get }) => {
    const cartItemList = get(cartItemListState);
    const cartItemSelectedIdList = get(cartItemSelectedIdListAtom);
    const filteredCartItemList = cartItemList.filter(({ id }) => cartItemSelectedIdList.includes(id));

    return filteredCartItemList.reduce((sum, { id }) => {
      const quantity = get(cartItemQuantityAtomFamily(id));

      return sum + quantity;
    }, 0);
  },
});
