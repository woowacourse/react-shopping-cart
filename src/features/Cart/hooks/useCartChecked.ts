import { CartItemList } from '../types/Cart.types';

export const useCartChecked = ({ cartItems }: CartItemList) => {
  const allChecked = cartItems?.every((item) => item.isChecked);
  const cartItemCount = cartItems?.length ?? 0;
  const selectedCartItemCount = cartItems?.filter((item) => item.isChecked).length ?? 0;

  return {
    allChecked,
    cartItemCount,
    selectedCartItemCount,
  };
};
