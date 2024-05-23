import { selector } from 'recoil';

import { cartItemsState, checkedItemsState } from './atoms';
import { couponSavedCheckListState, totalDiscountPriceState } from '../coupons/atoms';

import { CartItemProps } from '@/types/cartItem';
import { PRICE } from '@constants/config';

export const checkedCartItemsState = selector<CartItemProps[]>({
  key: 'checkedCartItemsState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    return cartItems.filter((cartItem) => get(checkedItemsState(cartItem.id)));
  },
});

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
    const checkedItems = get(checkedCartItemsState);

    const orderResult = {
      totalOrderPrice: 0,
      totalQuantity: 0,
    };

    return checkedItems.reduce((acc, cur) => {
      orderResult['totalOrderPrice'] += cur.quantity * cur.product.price;
      orderResult['totalQuantity'] += cur.quantity;
      return acc;
    }, orderResult);
  },
});

export const shippingPriceState = selector<number>({
  key: 'shippingPriceState',
  get: ({ get }) => {
    const { totalOrderPrice } = get(orderResultState);
    const couponCheckList = get(couponSavedCheckListState);
    const checkedCouponList = couponCheckList.filter((coupon) => coupon.isChecked);

    const isFreeShipping = checkedCouponList.find((coupon) => coupon.code === 'FREESHIPPING');

    if (isFreeShipping) {
      return PRICE.FREE;
    }

    return totalOrderPrice >= PRICE.FREE_SHIPPING_CONDITION ? PRICE.FREE : PRICE.DELIVERY_PRICE;
  },
});

export const totalPurchasePriceState = selector<number>({
  key: 'totalPurchasePriceState',
  get: ({ get }) => {
    const { totalOrderPrice } = get(orderResultState);
    const shippingPrice = get(shippingPriceState);
    const totalDiscountPrice = get(totalDiscountPriceState);

    return totalOrderPrice + shippingPrice - totalDiscountPrice;
  },
});
