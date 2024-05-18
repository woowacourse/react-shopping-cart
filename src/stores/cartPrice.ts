import { selector } from "recoil";
import { cartItemsState } from "./cartItems";
import { isCartItemSelectedState } from "./cartItemSelected";

export const cartPriceState = selector({
  key: "cartPriceState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const isCartItemSelected = get(isCartItemSelectedState);

    const orderPrice = cartItems.reduce((acc, cartItem) => {
      if (isCartItemSelected[cartItem.id.toString()]) {
        return acc + cartItem.product.price * cartItem.quantity;
      }
      return acc;
    }, 0);

    const deliveryFee = orderPrice === 0 ? 0 : orderPrice >= 100000 ? 0 : 3000;

    return { orderPrice, deliveryFee, totalPrice: orderPrice + deliveryFee };
  },
});
