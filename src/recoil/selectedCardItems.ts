import { atomFamily, selector, selectorFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { CartItemsSelector, CartItemsState } from './cartItems';

const { persistAtom } = recoilPersist({
  key: 'cartItem',
  storage: localStorage,
});

export const SelectedCartItems = atomFamily<boolean, number>({
  key: 'cartItem',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const SelectedAllCardItemsSelector = selectorFamily<boolean, number[]>({
  key: 'selectedAllCardItems',
  get:
    (cartItemIds) =>
    ({ get }) => {
      return cartItemIds.every((itemId) => get(SelectedCartItems(itemId)));
    },
  set:
    (cartItemIds) =>
    ({ set }, newValue) => {
      cartItemIds.forEach((itemId) => {
        set(SelectedCartItems(itemId), newValue);
      });
    },
});

export const SelectedSomeCardItemsSelector = selector<boolean>({
  key: 'selectedAllCardItems',
  get: ({ get }) => {
    get(CartItemsState);
    return get(CartItemsId).some((cartItemId) =>
      get(SelectedCartItems(cartItemId)),
    );
  },
});

export const CartItemsId = selector({
  key: 'cartItemsId',
  get: ({ get }) => {
    return get(CartItemsSelector).map((cartItem) => cartItem.id);
  },
});
