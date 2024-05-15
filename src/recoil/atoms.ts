import { atomFamily, selectorFamily } from 'recoil';

export const SelectedCartItem = atomFamily<boolean, number>({
  key: 'cartItem',
  default: true,
});

export const SelectedAllCardItemsSelector = selectorFamily<boolean, number[]>({
  key: 'selectedAllCardItems',
  get:
    (cartItemIds) =>
    ({ get }) => {
      return cartItemIds.every((itemId) => get(SelectedCartItem(itemId)));
    },
  set:
    (cartItemIds) =>
    ({ set }, newValue) => {
      cartItemIds.forEach((itemId) => {
        set(SelectedCartItem(itemId), newValue);
      });
    },
});
