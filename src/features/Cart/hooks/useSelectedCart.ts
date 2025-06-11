import { useCartContext } from '../context/CartProvider';

export const useSelectedCart = () => {
  const { cartItems } = useCartContext();
  return cartItems.filter((item) => item.isChecked);
};
