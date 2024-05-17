import { selector } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom } from "../atom/atom";
import { fetchCartItems } from "../../api/cartItem";

export const fetchCartItemsSelector = selector({
  key: "fetchCartItemsSelector",
  get: fetchCartItems,
});

// items들의 quantities를 관리 {id: quantity}꼴의 객체. (set: cartItemsAtom을 업데이트)
export const itemQuantitiesSelector = selector<Record<string, number>>({
  key: "itemQuantities",
  get: ({ get }) => {
    const cartItems = get(cartItemsAtom);
    return Object.fromEntries(cartItems.map((item) => [item.id, item.quantity]));
  },
  set: ({ set }, newValue) => {
    const id = Number(Object.keys(newValue)[0]);
    const newQuantity = Object.values(newValue)[0];
    set(cartItemsAtom, (prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  },
});

// (get: 현재 전체선택 여부. set: 전체선택/해제. )
export const isAllCheckedSelector = selector({
  key: "isAllCheckedSelector",
  get: ({ get }) => {
    const cartItems = get(cartItemsAtom);
    const checkedIds = get(cartItemCheckedIdsAtom);
    return cartItems.length === checkedIds.length;
  },
  set: ({ get, set }, newIsAllChecked) => {
    const cartItems = get(cartItemsAtom);
    if (!newIsAllChecked) {
      set(cartItemCheckedIdsAtom, []);
      return;
    }
    set(
      cartItemCheckedIdsAtom,
      cartItems.map((item) => item.id)
    );
  },
});

// 주문 금액 계산
export const orderPriceSelector = selector({
  key: "orderPriceSelector",
  get: ({ get }) => {
    const cartItems = get(cartItemsAtom);
    const checkedIds = get(cartItemCheckedIdsAtom);
    return cartItems.reduce((acc, item) => {
      if (checkedIds.includes(item.id)) {
        return acc + item.product.price * item.quantity;
      }
      return acc;
    }, 0);
  },
});

// 배달비 계산
export const shippingFeeSelector = selector({
  key: "shippingFeeSelector",
  get: ({ get }) => {
    const orderPrice = get(orderPriceSelector);
    return orderPrice >= 100000 ? 0 : 3000;
  },
});

// 전체 금액 계산
export const totalPriceSelector = selector({
  key: "totalPriceSelector",
  get: ({ get }) => {
    const orderPrice = get(orderPriceSelector);
    const shippingFee = get(shippingFeeSelector);
    return orderPrice + shippingFee;
  },
});

// 전체 수량 계산
export const totalCountSelector = selector({
  key: "totalCountSelector",
  get: ({ get }) => {
    const cartItems = get(cartItemsAtom);
    const checkedIds = get(cartItemCheckedIdsAtom);

    return cartItems.reduce((acc, item) => {
      if (checkedIds.includes(item.id)) {
        return acc + item.quantity;
      }
      return acc;
    }, 0);
  },
});
