import { selector } from "recoil";
import { checkedIdListAtom, cartItemListAtom } from "../atom/atom";
import { fetchCartItems } from "../../api/cartItem";

export const fetchCartItemListSelector = selector({
  key: "fetchCartItemListSelector",
  get: fetchCartItems,
});

export const itemQuantitiesSelector = selector({
  key: "itemQuantitiesSelector",
  get: ({ get }) => {
    const cartItems = get(cartItemListAtom);
    return Object.fromEntries(cartItems.map((item) => [item.id, item.quantity]));
  },
  set: ({ set }, { id, quantity: newQuantity }: { id: number; quantity: number }) => {
    set(cartItemListAtom, (prev) => prev.map((item) => (item.id !== id ? item : { ...item, quantity: newQuantity })));
  },
});

export const isAllCheckedSelector = selector({
  key: "isAllCheckedSelector",
  get: ({ get }) => {
    const cartItems = get(cartItemListAtom);
    const checkedIds = get(checkedIdListAtom);
    const idList = cartItems.map((item) => item.id);
    return Array.from(idList).every((id) => checkedIds.includes(id)) && idList.length === checkedIds.length;
  },
  set: ({ get, set }, newIsAllChecked) => {
    const cartItems = get(cartItemListAtom);
    if (!newIsAllChecked) {
      set(checkedIdListAtom, []);
      return;
    }
    set(
      checkedIdListAtom,
      cartItems.map((item) => item.id)
    );
  },
});

export const orderPriceSelector = selector({
  key: "orderPriceSelector",
  get: ({ get }) => {
    const cartItems = get(cartItemListAtom);
    const checkedIds = get(checkedIdListAtom);
    return cartItems.reduce((acc, item) => {
      if (checkedIds.includes(item.id)) {
        return acc + item.product.price * item.quantity;
      }
      return acc;
    }, 0);
  },
});

export const shippingFeeSelector = selector({
  key: "shippingFeeSelector",
  get: ({ get }) => {
    const orderPrice = get(orderPriceSelector);
    return orderPrice >= 100000 ? 0 : 3000;
  },
});

export const totalPriceSelector = selector({
  key: "totalPriceSelector",
  get: ({ get }) => {
    const orderPrice = get(orderPriceSelector);
    const shippingFee = get(shippingFeeSelector);
    return orderPrice + shippingFee;
  },
});

export const totalCountSelector = selector({
  key: "totalCountSelector",
  get: ({ get }) => {
    const cartItems = get(cartItemListAtom);
    const checkedIds = get(checkedIdListAtom);

    return cartItems.reduce((acc, item) => {
      if (checkedIds.includes(item.id)) {
        return acc + item.quantity;
      }
      return acc;
    }, 0);
  },
});

export const isVacantSelector = selector({
  key: "isVacantSelector",
  get: ({ get }) => {
    const cartItems = get(cartItemListAtom);
    return cartItems.length === 0;
  },
});
