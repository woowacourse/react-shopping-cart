import { CartItem } from '@/features/Cart/types/Cart.types';

export const useCartInfo = (cartItems: CartItem[]) => {
  const FREE_SHIPPING_THRESHOLD = 100000;

  const allChecked = cartItems.every((item) => item.isChecked);
  const cartItemCount = cartItems.length;
  const selectedCartItems = cartItems.filter((item) => item.isChecked);
  const selectedCartItemCount = selectedCartItems.length;
  const selectedTotalAmount = selectedCartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const progressValue = Math.min((selectedTotalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - selectedTotalAmount, 0);

  return {
    allChecked,
    cartItemCount,
    selectedCartItemCount,
    selectedTotalAmount,
    progressValue,
    remainingForFreeShipping,
  };
};
