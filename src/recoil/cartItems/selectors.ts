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

export const orderTotalPriceState = selector<number>({
  key: 'orderTotalPriceState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItems = cartItems.filter((cartItem) => get(checkedItemsState(cartItem.id)));

    return checkedItems.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
  },
});

export const totalQuantityState = selector<number>({
  key: 'totalQuantityState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItems = cartItems.filter((cartItem) => get(checkedItemsState(cartItem.id)));

    return checkedItems.reduce((acc, cur) => acc + cur.quantity, 0);
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

export const deliveryPriceState = selector<number>({
  key: 'deliveryPriceState',
  get: ({ get }) => {
    const cartItems = get(orderTotalPriceState);
    return cartItems >= 100000 ? 0 : 3000;
  },
});

export const purchaseTotalPriceState = selector<number>({
  key: 'purchaseTotalPriceState',
  get: ({ get }) => {
    const orderTotalPrice = get(orderTotalPriceState);
    const deliveryPrice = get(deliveryPriceState);

    return orderTotalPrice + deliveryPrice;
  },
});
