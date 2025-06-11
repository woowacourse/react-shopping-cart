import { FREE_DELIVERY_THRESHOLD } from '../constants/price';
import { useCartContext } from '../context/CartProvider';

export const useCartInfo = () => {
  const { cartItems } = useCartContext();
  const allChecked = cartItems.every((item) => item.isChecked);
  const cartItemCount = cartItems.length;
  const selectedCartItems = cartItems.filter((item) => item.isChecked);
  const selectedCartItemCount = selectedCartItems.length;
  const selectedTotalAmount = selectedCartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const progressValue = Math.min((selectedTotalAmount / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_DELIVERY_THRESHOLD - selectedTotalAmount, 0);

  return {
    allChecked,
    cartItemCount,
    selectedCartItems,
    selectedCartItemCount,
    selectedTotalAmount,
    progressValue,
    remainingForFreeShipping,
  };
};
