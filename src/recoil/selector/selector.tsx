import { selector, selectorFamily } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom, quantityAtomFamily, shippingCheckedAtom } from "../atom/atom";
import { ORDER_PRICE_THRESHOLD, SHIPPING_FEE } from "../../constants/setting";

// id에 대한 quantity를 가지고 있는 셀렉터
export const quantitySelectorFamily = selectorFamily({
  key: "quantitySelectorFamily",
  get:
    (id: number) =>
    ({ get }) => {
      return get(quantityAtomFamily(id));
    },
  set:
    (id: number) =>
    ({ get, set }, newQuantity) => {
      set(quantityAtomFamily(id), newQuantity);
      const cartItems = get(cartItemsAtom);
      const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item));
      set(cartItemsAtom, updatedItems);
    },
});

// 주문한 장바구니 목록 필터링
export const checkedCartItemsSelector = selector({
  key: "checkedCartItemsSelector",
  get: ({ get }) => {
    const cartItems = get(cartItemsAtom);
    const checkedIds = get(cartItemCheckedIdsAtom);
    return cartItems.filter((item) => checkedIds.includes(item.id));
  },
});

//주문 금액 계산
export const orderPriceSelector = selector({
  key: "orderPriceSelector",
  get: ({ get }) => {
    const checkedCartItems = get(checkedCartItemsSelector);
    return checkedCartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },
});

// 배달비 계산
export const shippingFeeSelector = selector({
  key: "shippingFeeSelector",
  get: ({ get }) => {
    let shippingFee = SHIPPING_FEE;
    const orderPrice = get(orderPriceSelector);
    const addShippingFee = get(shippingCheckedAtom);
    if (addShippingFee) shippingFee += SHIPPING_FEE;
    return orderPrice >= ORDER_PRICE_THRESHOLD ? 0 : shippingFee;
  },
});

//전체 수량 계산
export const totalCountSelector = selector({
  key: "totalCountSelector",
  get: ({ get }) => {
    const checkedCartItems = get(checkedCartItemsSelector);
    return checkedCartItems.reduce((total, item) => total + item.quantity, 0);
  },
});
