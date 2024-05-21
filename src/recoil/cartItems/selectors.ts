import { selector } from 'recoil';

import { cartItemsState, checkedItemsState } from './atoms';

import {
  DELIVERY_CHARGE,
  DELIVERY_CHARGE_FREE,
  MINIMUM_FREE_SHIPPING_AMOUNT,
} from '@/constants/cart';
import LocalStorage, { CART_ITEM } from '@/Storage';

export const isAllUnCheckedState = selector<boolean>({
  key: 'isAllUnCheckedState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    return !cartItems.some((cartItem) => get(checkedItemsState(cartItem.id)));
  },
});

export const isAllCheckedState = selector<boolean>({
  key: 'isAllCheckedState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    return cartItems.every((cartItem) => get(checkedItemsState(cartItem.id)));
  },
  set: ({ get, set }, newValue) => {
    const cartItems = get(cartItemsState);

    cartItems.forEach((cartItem) => {
      set(checkedItemsState(cartItem.id), newValue);
      LocalStorage.addData(CART_ITEM, cartItem.id, newValue as boolean);
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
    return cartItems >= MINIMUM_FREE_SHIPPING_AMOUNT ? DELIVERY_CHARGE_FREE : DELIVERY_CHARGE;
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
