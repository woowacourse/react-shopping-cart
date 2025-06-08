import { CartItemWithSelection } from "../../cart/types/response";

export const calculateOrderPrice = (items: CartItemWithSelection[]): number => {
  return items.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );
};

export const calculateTotalPrice = (
  orderPrice: number,
  shippingFee: number
): number => {
  return orderPrice + shippingFee;
};
