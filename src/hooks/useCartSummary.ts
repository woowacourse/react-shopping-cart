import { useCartItemContext } from "../contexts/useCartItemContext";
import {
  FREE_SHIPPING_MIN_AMOUNT,
  SHIPPING_FEE,
  REMOTE_AREA_SHIPPING_FEE,
} from "../constants";

export const useCartSummary = () => {
  const { cartItems, selectedItem, isRemoteAreaShipping } =
    useCartItemContext();

  const orderPrice = cartItems.reduce((acc, cartItem) => {
    if (selectedItem.has(cartItem.id)) {
      return acc + cartItem.product.price * cartItem.quantity;
    }
    return acc;
  }, 0);

  const baseShippingFee =
    orderPrice >= FREE_SHIPPING_MIN_AMOUNT ? 0 : SHIPPING_FEE;
  const remoteAreaShippingFee = isRemoteAreaShipping
    ? REMOTE_AREA_SHIPPING_FEE
    : 0;
  const shippingFee = baseShippingFee + remoteAreaShippingFee;
  const totalPrice = orderPrice + shippingFee;

  return {
    orderPrice,
    shippingFee,
    totalPrice,
  };
};
