import { useCartItemContext } from "../contexts/useCartItemContext";
import { FREE_SHIPPING_MIN_AMOUNT, SHIPPING_FEE } from "../constants";

export const useCartSummary = () => {
  const { cartItems, selectedItem } = useCartItemContext();

  const orderPrice = cartItems.reduce((acc, cartItem) => {
    if (selectedItem.has(cartItem.id)) {
      return acc + cartItem.product.price * cartItem.quantity;
    }
    return acc;
  }, 0);

  const shippingFee = orderPrice >= FREE_SHIPPING_MIN_AMOUNT ? 0 : SHIPPING_FEE;
  const totalPrice = orderPrice + shippingFee;

  return {
    orderPrice,
    shippingFee,
    totalPrice,
  };
};
