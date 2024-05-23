import { selector, selectorFamily } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom, quantityAtomFamily, shippingCheckedAtom } from "../atom/atom";
import { ORDER_PRICE_THRESHOLD, SHIPPING_FEE } from "../../constants/setting";
import { fetchCartItems } from "../../api/cartItemApi";
import { fetchCoupons } from "../../api/couponApi";

// 장바구니 상품 조회 api 호출
export const fetchCartItemsSelector = selector({
  key: "fetchCartItemsSelector",
  get: async ({ get }) => {
    const cartItems = await fetchCartItems();
    return cartItems;
  },
});

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
    let shippingFee = 3000;
    const orderPrice = get(orderPriceSelector);
    const addShippingFee = get(shippingCheckedAtom);
    if (addShippingFee) shippingFee += 3000;
    return orderPrice >= ORDER_PRICE_THRESHOLD ? 0 : shippingFee;
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

// 쿠폰 조회 api 호출
export const fetchCouponsSelector = selector({
  key: "fetchCouponsSelector",
  get: async () => {
    const coupons = await fetchCoupons();
    return coupons;
  },
});
