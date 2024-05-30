import { selector, useRecoilCallback } from 'recoil';

import { cartItemIdsState, checkedCartItemIdsState } from '@/e_entities/cart';

export const useToggleAllChecked = () => {
  return useRecoilCallback(({ snapshot, set }) => async () => {
    const cartItemIds = await snapshot.getPromise(cartItemIdsState);
    const checkedCartItemIds = await snapshot.getPromise(checkedCartItemIdsState);

    if (cartItemIds.every((id) => checkedCartItemIds.includes(id))) {
      set(checkedCartItemIdsState, []);
    } else {
      set(checkedCartItemIdsState, cartItemIds);
    }
  });
};

export const useToggleChecked = (cartItemId: CartItemId) => {
  return useRecoilCallback(({ snapshot, set }) => async () => {
    const checkedCartItemIds = await snapshot.getPromise(checkedCartItemIdsState);

    if (checkedCartItemIds.includes(cartItemId)) {
      set(
        checkedCartItemIdsState,
        checkedCartItemIds.filter((id) => id !== cartItemId)
      );
    } else {
      set(checkedCartItemIdsState, [...checkedCartItemIds, cartItemId]);
    }
  });
};

export const areAllCheckedState = selector({
  key: 'allCheckedState',
  get: ({ get }) => {
    const cartItemIds = get(cartItemIdsState);
    const checkedCartItemIds = get(checkedCartItemIdsState);
    return cartItemIds.length > 0 && cartItemIds.every((id) => checkedCartItemIds.includes(id));
  },
});
