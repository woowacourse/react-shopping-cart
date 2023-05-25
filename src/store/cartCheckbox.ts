import { atom, selector, selectorFamily } from 'recoil';

import { cartIdListState } from './cart';

const checkedCartIdListState = atom<Set<number>>({
  key: 'checkedCartIdList',
  default: selector({
    key: 'checkedCartIdList/default',
    get: ({ get }) => {
      const cartIdList = get(cartIdListState);

      return new Set(cartIdList);
    },
  }),
});

const isCartAllCheckedState = selector<boolean>({
  key: 'isCartAllChecked',
  get: ({ get }) => {
    const cartIdList = get(cartIdListState);
    const checkedCartIdList = get(checkedCartIdListState);

    return cartIdList.length !== 0 && cartIdList.length === checkedCartIdList.size;
  },
});

const checkedCartItemState = selectorFamily<boolean, number>({
  key: 'checkedCartItem',
  get:
    (productId) =>
    ({ get }) => {
      const checkedCartItems = get(checkedCartIdListState);

      return checkedCartItems.has(productId);
    },
});

export { checkedCartIdListState, isCartAllCheckedState, checkedCartItemState };
