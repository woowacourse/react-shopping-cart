import { CartItem } from '../types/Cart.types';

type OrderConfirmProps = {
  cartItems: CartItem[];
};
export const useOrderConfirm = ({ cartItems }: OrderConfirmProps) => {
  const hasCheckCartLength = cartItems?.filter((item) => item.isChecked).length;
  const totalQuantity = cartItems?.reduce(
    (acc, item) => acc + (item.isChecked ? item.quantity : 0),
    0
  );
  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + (item.isChecked ? item.product.price * item.quantity : 0),
    0
  );
  return { hasCheckCartLength, totalQuantity, totalPrice };
};
