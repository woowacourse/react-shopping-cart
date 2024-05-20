import { selector } from 'recoil';

import { cartItemsState, checkedItemsState } from './atoms';

import { PRICE } from '@constants/config';

export const isAllUnCheckedState = selector<boolean>({
  key: 'isAllUnCheckedState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    return !cartItems.some((cartItem) => get(checkedItemsState(cartItem.id)));
  },
});

export const allCheckedState = selector<boolean>({
  key: 'allCheckedState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    return cartItems.every((cartItem) => get(checkedItemsState(cartItem.id)));
  },
  set: ({ get, set }, newValue) => {
    const cartItems = get(cartItemsState);

    cartItems.forEach((cartItem) => {
      set(checkedItemsState(cartItem.id), newValue);
    });
  },
});

export const productTypesCountState = selector<number>({
  key: 'productTypesCountState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItems = cartItems.filter((cartItem) => get(checkedItemsState(cartItem.id)));

    return checkedItems.length;
  },
});

export const orderResultState = selector({
  key: 'orderResultState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItems = cartItems.filter((cartItem) => get(checkedItemsState(cartItem.id)));
    const orderResult = {
      totalOrderPrice: 0,
      totalQuantity: 0,
      deliveryPrice: PRICE.DELIVERY_PRICE,
      totalPurchasePrice: 0,
    };

    const result = checkedItems.reduce((acc, cur) => {
      orderResult['totalOrderPrice'] += cur.quantity * cur.product.price;
      orderResult['totalQuantity'] += cur.quantity;
      return acc;
    }, orderResult);

    result.deliveryPrice =
      result.totalOrderPrice >= PRICE.FREE_DELIVERY_CONDITION ? PRICE.FREE : PRICE.DELIVERY_PRICE;
    result.totalPurchasePrice = result.totalOrderPrice + result.deliveryPrice;

    return result;
  },
});
