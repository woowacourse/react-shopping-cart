import { CartItemList } from '../types/Cart.types';

const FREE_SHIPPING_THRESHOLD = 100000 as const;

export const useShippingProgress = ({ cartItems }: CartItemList) => {
  const selectedTotalAmount =
    cartItems
      ?.filter((item) => item.isChecked)
      .reduce((total, item) => total + item.product.price * item.quantity, 0) ?? 0;
  const progressValue = Math.min((selectedTotalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - selectedTotalAmount, 0);

  return {
    progressValue,
    remainingForFreeShipping,
  };
};
