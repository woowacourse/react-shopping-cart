import { CartItemType } from "@/apis/cartItems/cartItem.type";

type OrderConfirmState = {
  orderList: CartItemType[];
  paymentPrice: number;
};

export const isValidOrderConfirmState = (
  state: any
): state is OrderConfirmState => {
  if (!state) {
    return false;
  }

  if (typeof state !== "object") {
    return false;
  }

  if (!Array.isArray(state.orderList)) {
    return false;
  }

  return true;
};
