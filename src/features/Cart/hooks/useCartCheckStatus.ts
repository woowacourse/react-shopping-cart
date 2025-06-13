import { useCartContext } from '../context/CartProvider';

export const useCartCheckStatus = () => {
  const { cartItems } = useCartContext();
  const allChecked = cartItems.every((item) => item.isChecked);
  return { allChecked };
};
