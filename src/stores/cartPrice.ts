import { selector } from "recoil";
import { cartItemsState } from "./cartItems";
import { isCartItemsSelectedState } from "./cartItemSelected";

import { CART_PRICE } from "../constants/cart";

const calculateDeliveryFee = (orderPrice: number) => {
  if (orderPrice === 0) return 0;
  return orderPrice >= CART_PRICE.minOrderPrice ? 0 : CART_PRICE.deliveryFee;
};

export const cartPriceState = selector({
  key: "cartPriceState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    const orderPrice = cartItems.reduce((acc, item) => {
      const isSelected = get(isCartItemsSelectedState(item.id));
      return isSelected ? acc + item.product.price * item.quantity : acc;
    }, 0);

    const deliveryFee = calculateDeliveryFee(orderPrice);
    const totalPrice = orderPrice + deliveryFee;

    return { orderPrice, deliveryFee, totalPrice };
  },
});
