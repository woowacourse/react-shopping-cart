import { CartItemType } from "@/apis/cartItems/cartItem.type";

type PaymentSuccessState = {
  orderList: CartItemType[];
  paymentPrice: number;
};

export const isValidPaymentSuccessState = (
  state: any
): state is PaymentSuccessState => {
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
