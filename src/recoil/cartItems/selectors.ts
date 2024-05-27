import { selector } from 'recoil';

import { cartItemsState, checkedItemsState } from './atoms';
import { couponChecklistState, isAdditionalShippingState } from '../coupons/atoms';
import { totalDiscountPriceState } from '../coupons/selectors';

import { CouponCode } from '@/constants/coupon';
import { CartItemProps } from '@/types/cartItem';
import { calculateShippingPrice } from '@/utils/cartItems/utils';
import { isCheckedCoupon } from '@/utils/coupons/isCheckedCoupon';
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
    const couponCheckList = get(couponChecklistState);
    const isAdditionalShipping = get(isAdditionalShippingState);
    const additionalShipping = isAdditionalShipping ? PRICE.DELIVERY_PRICE : PRICE.FREE;

    const isFreeShipping = isCheckedCoupon(couponCheckList, CouponCode.FREESHIPPING);

    if (isFreeShipping) {
      return PRICE.FREE;
    }

    return calculateShippingPrice(totalOrderPrice, additionalShipping);
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
