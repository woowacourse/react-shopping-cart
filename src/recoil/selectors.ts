import { selector, selectorFamily } from 'recoil';

import { cartItemsState, isCartItemSelectedState } from './atoms';

import { fetchGetCartItems } from '../api/shoppingCart';

import { CartItemType } from '../type';
import CONDITION from '../constants/Condition';
import VALUE from '../constants/Value';

export const fetchedCartItemsSelector = selector({
  key: 'fetchedCartItems',
  get: async () => {
    return await fetchGetCartItems();
  },
});

export const cartItemsCountSelector = selector<number>({
  key: 'cartItemsCount',
  get: ({ get }) => {
    return get(cartItemsState).length;
  },
});

export const cartItemIdsSelector = selector({
  key: 'CartItemIds',
  get: ({ get }) => {
    return get(cartItemsState).map((cartItem) => cartItem.id);
  },
});

export const selectedCartItemsSelector = selector<CartItemType[]>({
  key: 'selectedCartItems',
  get: ({ get }) => {
    return get(cartItemsState).filter((cartItem) =>
      get(isCartItemSelectedState(cartItem.id)),
    );
  },
});

export const selectedCartItemsCountSelector = selector<number>({
  key: 'selectedCartItemCount',
  get: ({ get }) => {
    return get(selectedCartItemsSelector).length;
  },
});

export const isAllCartItemSelectedSelectorFamily = selectorFamily<
  boolean,
  number[]
>({
  key: 'selectedAllCartItem',
  get:
    (cartItemIds) =>
    ({ get }) => {
      return cartItemIds.every((itemId) =>
        get(isCartItemSelectedState(itemId)),
      );
    },
  set:
    (cartItemIds) =>
    ({ set }, newValue) => {
      cartItemIds.forEach((itemId) => {
        set(isCartItemSelectedState(itemId), newValue);
      });
    },
});

export const isSomeCartItemSelectedSelector = selector<boolean>({
  key: 'selectedSomeCartItem',
  get: ({ get }) => {
    return get(cartItemIdsSelector).some((cartItemId) =>
      get(isCartItemSelectedState(cartItemId)),
    );
  },
});

export const totalOrderAmountSelector = selector<number>({
  key: 'totalOrderAmount',
  get: ({ get }) => {
    return get(selectedCartItemsSelector).reduce(
      (totalOrderAmount, cartItem) => {
        const orderAmount = cartItem.product.price * cartItem.quantity;
        return totalOrderAmount + orderAmount;
      },
      0,
    );
  },
});

export const totalCartItemQuantitySelector = selector<number>({
  key: 'totalCartItemQuantity',
  get: ({ get }) => {
    return get(selectedCartItemsSelector).reduce(
      (totalCartItemQuantity, cartItem) => {
        return totalCartItemQuantity + cartItem.quantity;
      },
      0,
    );
  },
});

export const shippingFeeSelector = selector<number>({
  key: 'shippingFee',
  get: ({ get }) => {
    const totalOrderAmount = get(totalOrderAmountSelector);

    return totalOrderAmount >= CONDITION.freeShippingFee ||
      totalOrderAmount === CONDITION.noneSelected
      ? VALUE.freeShippingFee
      : VALUE.shippingFee;
  },
});

export const totalPaymentAmountSelector = selector<number>({
  key: 'totalPaymentAmount',
  get: ({ get }) => {
    return get(totalOrderAmountSelector) + get(shippingFeeSelector);
  },
});
