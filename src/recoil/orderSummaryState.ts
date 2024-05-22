import { selector } from "recoil";
import { cartItemSelectedSelector } from "./cartItemState";

export const orderPriceSelector = selector({
  key: "orderPriceSelector",
  get: ({ get }) => get(cartItemSelectedSelector).reduce((acc, item) => acc + item.quantity * item.product.price, 0),
});

export const shippingFeeSelector = selector({
  key: "shippingFeeSelector",
  get: ({ get }) => (get(orderPriceSelector) >= 100000 ? 0 : 3000),
});

export const totalPriceSelector = selector({
  key: "totalPriceSelector",
  get: ({ get }) => get(orderPriceSelector) + get(shippingFeeSelector),
});

export const totalCountSelector = selector({
  key: "totalCountSelector",
  get: ({ get }) => get(cartItemSelectedSelector).reduce((acc, item) => acc + item.quantity, 0),
});
