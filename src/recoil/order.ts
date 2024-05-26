import { selector } from 'recoil';
import { cartListSelector } from './cartList';
import { cartItemQuantityState, cartItemSelectedState } from './cartItem';

/**
 * 선택된 제품의 총 금액
 */
export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const cartList = get(cartListSelector);
    const totalPrice = cartList.reduce((acc, cartItem) => {
      const isSelectedItem = get(cartItemSelectedState(cartItem.id));
      const quantity = get(cartItemQuantityState(cartItem.id));

      if (isSelectedItem) return acc + quantity * cartItem.product.price;
      return acc;
    }, 0);
    return totalPrice;
  },
});

/**
 * 선택된 제품의 총 수량
 */
export const totalQuantitySelector = selector({
  key: 'totalQuantitySelector',
  get: ({ get }) => {
    const cartList = get(cartListSelector);
    const totalQuantity = cartList.reduce((acc, cartItem) => {
      const isSelectedItem = get(cartItemSelectedState(cartItem.id));
      const quantity = get(cartItemQuantityState(cartItem.id));

      if (isSelectedItem) return acc + quantity;
      return acc;
    }, 0);

    return totalQuantity;
  },
});

/**
 * 선택된 제품의 종류
 */
export const numberOfTypesSelector = selector({
  key: 'numberOfTypesSelector',
  get: ({ get }) => {
    const cartList = get(cartListSelector);
    const numberOfTypes = cartList.reduce((acc, cartItem) => {
      const isSelectedItem = get(cartItemSelectedState(cartItem.id));

      if (isSelectedItem) return acc + 1;
      return acc;
    }, 0);

    return numberOfTypes;
  },
});

/**
 * 선택된 제품의 배송비. 주문 금액이 100,000원 이상이면 0원
 */
export const shippingFeeSelector = selector({
  key: 'shippingFeeSelector',
  get: ({ get }) => {
    const totalPrice = get(totalPriceSelector);

    if (totalPrice >= 100_000) return 0;
    return 3000;
  },
});
