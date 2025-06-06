import { ResponseCartItem } from "../types/types";

export const calculateTotalPrice = (items: ResponseCartItem[]) => {
  return items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

export const calculateShippingFee = (totalPrice: number) => {
  if (totalPrice >= 100000 || totalPrice === 0) {
    return 0;
  }
  return 3000;
};

export const formatPrice = (price: number) => {
  return price.toLocaleString("ko-KR");
};
