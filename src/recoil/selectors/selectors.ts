import { selector } from "recoil";
import { selectedListState, cartItemsState } from "../atoms/atoms";
import {
  DEFAULT_DELIVERY_FEE,
  DELIVERY_FEE_THRESHOLD,
} from "../../constants/cart";

export const cartPriceState = selector({
  key: "cartPriceState",
  get: ({ get }) => {
    const selectedCartItems = get(selectedCartItemsState);
    const orderPrice = selectedCartItems.reduce((acc, cartItem) => {
      return acc + cartItem.product.price * cartItem.quantity;
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

export const selectedCartItemsState = selector({
  key: "selectedCartItemsState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedList = get(selectedListState);
    return cartItems.filter((cartItem) => selectedList.includes(cartItem.id));
  },
});

export const cartSummaryState = selector({
  key: "cartSummaryState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedCartItems = get(selectedCartItemsState);
    const cartItemKind = cartItems.length;

    const cartItemSelectedKind = selectedCartItems.length;
    const cartItemSelectedQuantity = selectedCartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );

    return { cartItemKind, cartItemSelectedQuantity, cartItemSelectedKind };
  },
});
