import { selector, selectorFamily } from 'recoil';

import { cartItemsState, isCartItemSelectedState } from './atoms';

import { fetchGetCartItems } from '../api/shoppingCart';

import { CartItemType } from '../type';
import CONDITION from '../constants/Condition';
import VALUE from '../constants/Value';

export const fetchedCartItemsState = selector({
  key: 'fetchedCartItemsState',
  get: async () => {
    return await fetchGetCartItems();
  },
});

export const selectedCartItemsState = selector<CartItemType[]>({
  key: 'selectedCartItemsState',
  get: ({ get }) => {
    return get(cartItemsState).filter((cartItem) =>
      get(isCartItemSelectedState(cartItem.id)),
    );
  },
});

export const isAllCartItemSelectedState = selectorFamily<boolean, number[]>({
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

export const isSomeCartItemSelectedState = selector<boolean>({
  key: 'selectedSomeCartItem',
  get: ({ get }) => {
    return get(cartItemIdsState).some((cartItemId) =>
      get(isCartItemSelectedState(cartItemId)),
    );
  },
});

export const cartItemIdsState = selector({
  key: 'CartItemIds',
  get: ({ get }) => {
    return get(cartItemsState).map((cartItem) => cartItem.id);
  },
});

export const cartItemsCountState = selector<number>({
  key: 'cartItemsCount',
  get: ({ get }) => {
    return get(cartItemsState).length;
  },
});

export const totalOrderAmountState = selector<number>({
  key: 'totalOrderAmount',
  get: ({ get }) => {
    return get(selectedCartItemsState).reduce((totalOrderAmount, cartItem) => {
      const orderAmount = cartItem.product.price * cartItem.quantity;
      return totalOrderAmount + orderAmount;
    }, 0);
  },
});

export const totalCartItemQuantityState = selector<number>({
  key: 'totalCartItemQuantity',
  get: ({ get }) => {
    return get(selectedCartItemsState).reduce(
      (totalCartItemQuantity, cartItem) => {
        return totalCartItemQuantity + cartItem.quantity;
      },
      0,
    );
  },
});

export const selectedCartItemsCountState = selector<number>({
  key: 'selectedCartItemCount',
  get: ({ get }) => {
    return get(selectedCartItemsState).length;
  },
});

export const shippingFeeState = selector<number>({
  key: 'shippingFee',
  get: ({ get }) => {
    const totalOrderAmount = get(totalOrderAmountState);

    return totalOrderAmount >= CONDITION.freeShippingFee ||
      totalOrderAmount === CONDITION.noneSelected
      ? VALUE.freeShippingFee
      : VALUE.shippingFee;
  },
});

export const totalPaymentAmountState = selector<number>({
  key: 'totalPaymentAmount',
  get: ({ get }) => {
    return get(totalOrderAmountState) + get(shippingFeeState);
  },
});
