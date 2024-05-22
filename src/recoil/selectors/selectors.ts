import { selector } from "recoil";
import { selectedListState, cartItemsState } from "../atoms/atoms";
import {
  DEFAULT_DELIVERY_FEE,
  DELIVERY_FEE_THRESHOLD,
} from "../../constants/cart";

export const cartPriceState = selector({
  key: "cartPriceState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedList = get(selectedListState);

    const orderPrice = cartItems.reduce((acc, cartItem) => {
      if (selectedList.includes(cartItem.id)) {
        return acc + cartItem.product.price * cartItem.quantity;
      }
      return acc;
    }, 0);

    const deliveryFee =
      orderPrice === 0
        ? 0
        : orderPrice >= DELIVERY_FEE_THRESHOLD
        ? 0
        : DEFAULT_DELIVERY_FEE;

    return { orderPrice, deliveryFee, totalPrice: orderPrice + deliveryFee };
  },
});

export const cartSummaryState = selector({
  key: "cartSummaryState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const cartItemKind = cartItems.length;
    const cartItemTotalQuantity = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );

    return { cartItemKind, cartItemTotalQuantity };
  },
});
