import { selector } from "recoil";
import { DELIVERY } from "../../constants";
import { CartSummary } from "../../types";
import { cartItemsState, checkedItemState } from "../atoms/atoms";

export const cartSummarySelectorState = selector<CartSummary>({
  key: "cartSummarySelectorState",
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const checkedItems = get(checkedItemState);

    const checkedCartItems = cartItems.filter((item) => checkedItems[item.id]);

    const orderPrice = checkedCartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const deliveryPrice =
      orderPrice === 0 || orderPrice >= DELIVERY.FREE_THRESHOLD ? DELIVERY.FREE : DELIVERY.STANDARD;
    const totalPrice = orderPrice + deliveryPrice;

    const uniqueItemCount = checkedCartItems.length;
    const totalItemCount = checkedCartItems.reduce((total, item) => total + item.quantity, 0);

    return {
      cartItems,
      orderPrice,
      deliveryPrice,
      totalPrice,
      uniqueItemCount,
      totalItemCount,
    };
  },
});
