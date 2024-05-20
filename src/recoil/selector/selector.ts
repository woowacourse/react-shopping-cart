import { selector } from "recoil";
import { DELIVERY } from "../../constants";
import { CartSummary } from "../../types";
import { cartItemsState, checkedItemState } from "../atoms/atoms";

export const uniqueItemCountState = selector<number>({
  key: "uniqueItemCountState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    return cartItems.length;
  },
});

export const cartSummarySelectorState = selector<CartSummary>({
  key: "cartSummarySelectorState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItems = get(checkedItemState);

    const orderPrice = cartItems.reduce(
      (total, item) => (checkedItems[item.id] ? total + item.product.price * item.quantity : total),
      0
    );
    const deliveryPrice =
      orderPrice === 0 || orderPrice >= DELIVERY.FREE_THRESHOLD ? DELIVERY.FREE : DELIVERY.STANDARD;
    const totalPrice = orderPrice + deliveryPrice;

    return {
      cartItems,
      orderPrice,
      deliveryPrice,
      totalPrice,
    };
  },
});
