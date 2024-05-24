import { selector } from 'recoil';

import { cartItemsState, checkedItemsState, isRemoteAreaState } from './atoms';
import { calculateTotalDiscountAmountSelector } from '../coupon/selector';

import {
  DELIVERY_CHARGE,
  DELIVERY_CHARGE_FREE,
  MINIMUM_FREE_SHIPPING_AMOUNT,
} from '@/constants/cart';
import LocalStorage, { CART_ITEM } from '@/Storage';
import { CartItemProps } from '@/types/cartItem';

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

export const checkedItemsSelector = selector<CartItemProps[]>({
  key: 'checkedItemsSelector',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    return cartItems.filter((cartItem) => get(checkedItemsState(cartItem.id)));
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
    const orderTotalPrice = get(orderTotalPriceState);
    const isRemoteArea = get(isRemoteAreaState);

    if (orderTotalPrice >= MINIMUM_FREE_SHIPPING_AMOUNT) return DELIVERY_CHARGE_FREE;

    return isRemoteArea ? DELIVERY_CHARGE * 2 : DELIVERY_CHARGE;
  },
});

export const purchaseTotalPriceState = selector<number>({
  key: 'purchaseTotalPriceState',
  get: ({ get }) => {
    const orderTotalPrice = get(orderTotalPriceState);
    const deliveryPrice = get(deliveryPriceState);
    const discountTotalPrice = get(calculateTotalDiscountAmountSelector(true));

    return orderTotalPrice + deliveryPrice - discountTotalPrice;
  },
});
