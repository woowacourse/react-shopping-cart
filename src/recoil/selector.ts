import { selector } from "recoil";
import { cartItemsState } from "./atoms";

export const categoryCountState = selector<number>({
  key: "categoryCountState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.length;
  },
});

export const orderPriceState = selector<number>({
  key: "orderPriceState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const orderPrice = cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    return orderPrice;
  },
});
