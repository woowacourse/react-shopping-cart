import { selector } from "recoil";
import { cartItemCheckedIdsAtom, cartItemsAtom } from "./atom";

export const quantityAtom = selector({
  key: "cartItemQuantity",
  get: ({ get }) => {
    const cartItems = get(cartItemsAtom);
    return Object.fromEntries(cartItems.map((item) => [item.id, item.quantity]));
  },
});

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
