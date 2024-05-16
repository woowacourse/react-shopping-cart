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
      const quantity = get(cartItemQuantityAtomFamily(`${cartItemId}`)); // 여기가 문제 계속 새로운 family로 quantity atom이 초기화되고있음

      return (sum += quantity);
    }, 0);
  },
});
