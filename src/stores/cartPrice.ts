import { selector } from "recoil";
import { cartItemsState } from "./cartItems";
import { isCartItemsSelectedState } from "./cartItemSelected";
import { CART_PRICE } from "../constants/cart";

export const cartPriceState = selector({
  key: "cartPriceState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    const orderPrice = cartItems.reduce((acc, cartItem) => {
      const isCartItemSelected = get(isCartItemsSelectedState(cartItem.id));
      if (isCartItemSelected) {
        return acc + cartItem.product.price * cartItem.quantity;
      }
      return acc;
    }, 0);

    const deliveryFee =
      orderPrice === 0
        ? 0
        : orderPrice >= CART_PRICE.minOrderPrice
        ? 0
        : CART_PRICE.deliveryFee;

    return { orderPrice, deliveryFee, totalPrice: orderPrice + deliveryFee };
  },
});
