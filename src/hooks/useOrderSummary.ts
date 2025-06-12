import { useLocation } from 'react-router';
import { useCartData } from '../utils/fetcher';
import { CartItem } from '../types/cart';

export function useOrderSummary() {
  const location = useLocation();
  const { data: cartItems } = useCartData();
  const checkedItems = location.state?.checkedItems || [];

  const selectedCartItems: CartItem[] = cartItems?.content
    ? cartItems.content.filter((item: CartItem) => checkedItems.includes(item.id))
    : [];

  const price = selectedCartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const shippingFee = price >= 100000 ? 0 : 3000;
  const totalPrice = price + shippingFee;

  return {
    selectedCartItems,
    price,
    shippingFee,
    totalPrice,
  };
}
