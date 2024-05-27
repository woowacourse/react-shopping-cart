import { atom, selector, selectorFamily } from 'recoil';

import { fetchCartItems, localStorageEffect, CartItem } from '@/f_shared';

// 장바구니 상품 배열
export const cartItemsState = atom<CartItem[]>({
  key: 'cartItemsState',
  default: selector({
    key: 'cartItemsState/Default',
    get: async () => {
      const cartItems = await fetchCartItems();
      return cartItems;
    },
  }),
});

// 장바구니 상품 ID 배열
export const cartItemIdsState = selector<CartItemId[]>({
  key: 'cartItemIdsState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.map((item) => item.id);
  },
});

// 장바구니 상품 Family
export const cartItemFamily = selectorFamily<CartItem, CartItemId>({
  key: 'cartItemFamily',
  get:
    (id) =>
    ({ get }) => {
      const cartItems = get(cartItemsState);
      const item = cartItems.find((item) => item.id === id);
      if (!item) {
        throw new Error(`CartItem with id ${id} not found`);
      }
      return item;
    },
});

// 장바구니 상품 수
export const cartItemCountState = selector<number>({
  key: 'cartItemCountState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.length;
  },
});

// 선택된 상품 ID 배열
export const checkedCartItemIdsState = atom<CartItemId[]>({
  key: 'checkedCartItemIdsState',
  default: [],
  effects: [localStorageEffect('checkedCartItemIds', cartItemIdsState)],
});

// 선택된 상품 수
export const checkedCartItemCountState = selector<number>({
  key: 'checkedCartItemCountState',
  get: ({ get }) => {
    const checkedCartItemIds = get(checkedCartItemIdsState);
    return checkedCartItemIds.length;
  },
});

// 총 주문 금액
export const cartTotalAmountState = selector<number>({
  key: 'cartTotalAmountState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedCartItemIds = get(checkedCartItemIdsState);
    return cartItems
      .filter((item) => checkedCartItemIds.includes(item.id))
      .reduce((total, item) => total + item.product.price * item.quantity, 0);
  },
});

// 배송비
export const deliveryFeeState = selector<number>({
  key: 'deliveryFeeState',
  get: ({ get }) => {
    const cartTotalAmount = get(cartTotalAmountState);
    return cartTotalAmount < 100000 ? 3000 : 0;
  },
});

// 최종 결제 금액
export const finalPaymentAmountState = selector<number>({
  key: 'finalPaymentAmountState',
  get: ({ get }) => {
    const cartTotalAmount = get(cartTotalAmountState);
    const deliveryFee = get(deliveryFeeState);
    return cartTotalAmount + deliveryFee;
  },
});
