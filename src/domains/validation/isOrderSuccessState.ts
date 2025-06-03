import { CartItemType } from "@/apis/cartItems/cartItem.type";

type OrderSuccessState = {
  orderList: CartItemType[];
  paymentPrice: number;
};

export const isOrderSuccessState = (state: any): state is OrderSuccessState => {
  if (!state) {
    return false;
  }

  if (typeof state !== "object") {
    return false;
  }

  if (
    !Array.isArray(state.orderList) ||
    typeof state.paymentPrice !== "number"
  ) {
    return false;
  }

  return true;
};
