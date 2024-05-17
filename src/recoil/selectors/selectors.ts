import { selector } from "recoil";
import { getCartItems } from "../../apis";
import { CartItemType } from "../../types";
import { isSelectedState } from "../atoms/atoms";
import {
  DEFAULT_DELIVERY_FEE,
  DELIVERY_FEE_THRESHOLD,
} from "../../constants/cart";

export const cartItemsState = selector<CartItemType[]>({
  key: "cartItemsState",
  get: async () => {
    const cartItems = await getCartItems();

    return cartItems;
  },
});

export const cartPriceState = selector({
  key: "cartPriceState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const isSelected = get(isSelectedState);

    const orderPrice = cartItems.reduce((acc, cartItem) => {
      if (isSelected[cartItem.id.toString()]) {
        return acc + cartItem.product.price * cartItem.quantity;
      }
      return acc;
    }, 0);

    const deliveryFee =
      orderPrice === 0
        ? 0
        : orderPrice >= DEFAULT_DELIVERY_FEE
        ? 0
        : DELIVERY_FEE_THRESHOLD;

    return { orderPrice, deliveryFee, totalPrice: orderPrice + deliveryFee };
  },
});
