import { selector } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom } from "../atom/atom";
import { ORDER_PRICE_THRESHOLD, SHIPPING_FEE } from "../../constants/setting";
import { fetchCartItems } from "../../api/cartItemApi";

// 장바구니 상품 조회 api 호출
export const fetchCartItemsSelector = selector({
  key: "fetchCartItemsSelector",
  get: async () => {
    const cartItems = await fetchCartItems();
    return cartItems;
  },
});

// 전체 id에 대한 양을 가지고 있는 셀렉터. (get: {id: quantity, ...}. set: 해당 id를 해당 quantity로 변경 )
export const quantitySelector = selector<Record<string, number>>({
  key: "cartItemQuantity",
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

// 전체선택 여부를 관리하는 셀렉터. (get: 현재 전체선택 여부. set: 전체선택/해제. )
export const allCheckedSelector = selector({
  key: "allCheckedSelector",
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

//주문 금액 계산
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
    return orderPrice >= ORDER_PRICE_THRESHOLD ? 0 : SHIPPING_FEE;
  },
});

//전체 금액 계산
export const totalPriceSelector = selector({
  key: "totalPriceSelector",
  get: ({ get }) => {
    const orderPrice = get(orderPriceSelector);
    const shippingFee = get(shippingFeeSelector);
    return orderPrice + shippingFee;
  },
});

//전체 수량 계산
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
