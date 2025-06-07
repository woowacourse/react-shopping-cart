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

export const calculateDeliveryPrice = (
  totalPrice: number,
  isRemoteArea: boolean
) => {
  if (totalPrice >= 100000) {
    return 0;
  }
  return isRemoteArea ? 6000 : 3000;
};
