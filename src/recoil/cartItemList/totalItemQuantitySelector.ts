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
      const quantity = get(cartItemQuantityAtomFamily(id)); // 여기가 문제 계속 새로운 family로 quantity atom이 초기화되고있음

      return sum + quantity;
    }, 0);
  },
});
