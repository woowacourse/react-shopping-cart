import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { selectedCartItemsState } from './selectedCardItems';
import { fetchedCartItemsSelector } from './fetch';
import { discountedPriceState } from './coupons';
import {
  DELIVERY_FEE,
  FREE_DELIVERY_FEE_LIMIT,
} from '../components/constants/cartItem';

export const cartItemsState = atom({
  key: 'cartItemsState',
  default: fetchedCartItemsSelector,
});

export const cartItemQuantityAdjustSelector = selectorFamily({
  key: `cartItemQuantityAdjustSelector`,
  get:
    (id: number) =>
    ({ get }) => {
      const item = get(cartItemsState).find((cartItem) => cartItem.id === id);
      return item ? item.quantity : 0;
    },
  set:
    (id) =>
    ({ set }, newValue) => {
      set(cartItemQuantityState(id), newValue);
    },
});

export const cartItemQuantityState = atomFamily({
  key: `cartItemQuantityState`,
  default: cartItemQuantityAdjustSelector,
});

export const cartItemsIdState = selector({
  key: 'cartItemsId',
  get: ({ get }) => {
    return get(cartItemsState).map((cartItem) => cartItem.id);
  },
});

/**
 * 선택된 상품 리스트
 *
 */
export const selectedCartItemsSelector = selector({
  key: 'selectedCartItemsSelector',
  get: async ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.filter((cartItem) =>
      get(selectedCartItemsState(cartItem.id)),
    );
  },
});

/**
 * 전체 장바구니 아이템의 수량
 */
export const totalCartItemQuantitySelector = selector({
  key: 'totalCartItemQuantitySelector',
  get: async ({ get }) => {
    const selectedCartItems = get(selectedCartItemsSelector);

    return selectedCartItems.reduce((totalCartItemQuantity, cartItem) => {
      if (get(cartItemQuantityState(cartItem.id)))
        return totalCartItemQuantity + get(cartItemQuantityState(cartItem.id));
      return totalCartItemQuantity;
    }, 0);
  },
});

/**
 * 주문 가격
 */
export const totalOrderAmountSelector = selector({
  key: 'totalOrderAmountSelector',
  get: async ({ get }) => {
    const selectedCartItems = get(selectedCartItemsSelector);

    return selectedCartItems.reduce((totalOrderAmount, cartItem) => {
      const orderAmount =
        cartItem.product.price * get(cartItemQuantityState(cartItem.id));
      return totalOrderAmount + orderAmount;
    }, 0);
  },
});

/**
 * 배송비
 */

export const mountainousAreaState = atom({
  key: 'mountainousAreaState',
  default: false,
});
export const shippingFeeSelector = selector({
  key: 'shippingFeeSelector',
  get: ({ get }) => {
    const totalOrderAmount = get(totalOrderAmountSelector);
    if (totalOrderAmount >= FREE_DELIVERY_FEE_LIMIT || totalOrderAmount === 0)
      return 0;
    return get(mountainousAreaState)
      ? DELIVERY_FEE.default + DELIVERY_FEE.mountainousArea
      : DELIVERY_FEE.default;
  },
});

/**
 * 최종 주문 가격
 */
export const totalPaymentAmountSelector = selector({
  key: 'totalPaymentAmountSelector',
  get: ({ get }) => {
    const totalOrderAmount = get(totalOrderAmountSelector);
    const shippingFee = get(shippingFeeSelector);
    const applyCoupon = get(discountedPriceState);

    return totalOrderAmount + shippingFee - applyCoupon;
  },
});
