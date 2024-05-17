import { atomFamily, selector, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { fetchedCartItemsState } from './cartItems';

const { persistAtom } = recoilPersist({
  key: 'selectedCartItem',
  storage: localStorage,
});

export const selectedCartItemState = atomFamily<boolean, number>({
  key: 'selectedCartItem',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const selectedAllCartItemState = selectorFamily<boolean, number[]>({
  key: 'selectedAllCartItem',
  get:
    (cartItemIds) =>
    ({ get }) => {
      return cartItemIds.every((itemId) => get(selectedCartItemState(itemId)));
    },
  set:
    (cartItemIds) =>
    ({ set }, newValue) => {
      cartItemIds.forEach((itemId) => {
        set(selectedCartItemState(itemId), newValue);
      });
    },
});

export const selectedSomeCartItemState = selector<boolean>({
  key: 'selectedSomeCartItem',
  get: ({ get }) => {
    get(fetchedCartItemsState);
    return get(cartItemIdsState).some((cartItemId) =>
      get(selectedCartItemState(cartItemId)),
    );
  },
});

export const cartItemIdsState = selector({
  key: 'CartItemIds',
  get: ({ get }) => {
    return get(fetchedCartItemsState).map((cartItem) => cartItem.id);
  },
});
