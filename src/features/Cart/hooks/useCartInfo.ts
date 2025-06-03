import { CartItem } from '@/features/Cart/types/Cart.types';
import { FREE_DELIVERY_THRESHOLD } from '../constants/price';

export const useCartInfo = (cartItems: CartItem[]) => {
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
    selectedCartItemCount,
    selectedTotalAmount,
    progressValue,
    remainingForFreeShipping,
  };
};
