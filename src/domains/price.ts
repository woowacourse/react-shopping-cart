import type { CartItemType } from "../types/response";
import { getCartItemById } from "../utils/getCartItemById";
import { FEE } from "../constants/systemConstants";

export const calculateTotalPrice = (
  orderPrice: number,
  deliveryFee: number
) => {
  return orderPrice + deliveryFee;
};

export const calculateDeliveryFee = (orderPrice: number) => {
  return orderPrice > FEE.DELIVERY_FEE_STANDARD ? 0 : FEE.DELIVERY_FEE;
};

export const calculateTotalCartItemPrice = (
  cartData: CartItemType[],
  isCheckedArray: number[]
) => {
  const cartItems = isCheckedArray.map((id) => getCartItemById(cartData, id));
  return cartItems.reduce(
    (acc, curr) => acc + (curr?.quantity ?? 0) * (curr?.product.price ?? 0),
    0
  );
};

export const getPriceSummary = (
  cartData: CartItemType[],
  isCheckedSet: Set<number>
) => {
  const isCheckedArray = Array.from(isCheckedSet);
  const orderPrice = calculateTotalCartItemPrice(cartData, isCheckedArray);
  const deliveryFee = calculateDeliveryFee(orderPrice);
  const totalPrice = calculateTotalPrice(orderPrice, deliveryFee);

  return {
    orderPrice,
    deliveryFee,
    totalPrice,
  };
};
