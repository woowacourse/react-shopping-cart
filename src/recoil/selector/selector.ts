import { selector } from "recoil";
import { DELIVERY } from "../../constants";
import { cartItemsState } from "../atoms/atoms";

export const uniqueItemCountState = selector<number>({
  key: "uniqueItemCountState",
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

export const deliveryPriceState = selector<number>({
  key: "deliveryPriceState",
  get: ({ get }) => {
    const orderPrice = get(orderPriceState);
    const deliveryPrice = orderPrice > DELIVERY.FREE_THRESHOLD ? DELIVERY.FREE : DELIVERY.STANDARD;
    return deliveryPrice;
  },
});

export const totalPriceState = selector<number>({
  key: "totalPriceState",
  get: ({ get }) => {
    const orderPrice = get(orderPriceState);
    const deliveryPrice = get(deliveryPriceState);
    return orderPrice + deliveryPrice;
  },
});
