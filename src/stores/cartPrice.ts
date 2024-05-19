import { selector } from "recoil";
import { cartItemsState } from "./cartItems";
import { isCartItemsSelectedState } from "./cartItemSelected";

const DELIVERY_FEE = 3_000;
const MIN_ORDER_PRICE = 1_00_000;

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
      orderPrice === 0 ? 0 : orderPrice >= MIN_ORDER_PRICE ? 0 : DELIVERY_FEE;

    return { orderPrice, deliveryFee, totalPrice: orderPrice + deliveryFee };
  },
});
