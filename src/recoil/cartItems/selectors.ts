import { selector } from 'recoil';

import { cartItemsState, checkedItemsState } from './atoms';

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
      deliveryPrice: 3000,
      totalPurchasePrice: 0,
    };

    const result = checkedItems.reduce((acc, cur) => {
      orderResult['totalOrderPrice'] += cur.quantity * cur.product.price;
      orderResult['totalQuantity'] += cur.quantity;
      return acc;
    }, orderResult);

    result.totalPurchasePrice = result.totalOrderPrice + result.deliveryPrice;
    result.deliveryPrice = result.totalOrderPrice >= 100000 ? 0 : 3000;

    return result;
  },
});
