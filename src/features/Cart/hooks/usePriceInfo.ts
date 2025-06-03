import { CartItem } from '@/features/Cart/types/Cart.types';
import { FREE_DELIVERY_THRESHOLD } from '../constants/price';

export const usePriceInfo = (cartItems: CartItem[] = []) => {
  const orderPrice = cartItems
    .filter((item) => item.quantity > 0 && item.isChecked)
    .reduce((acc, cart) => {
      return acc + Number(cart.product.price) * Number(cart.quantity);
    }, 0);

  const deliveryFee = orderPrice >= FREE_DELIVERY_THRESHOLD ? 0 : 3000;
  const totalPrice = orderPrice + deliveryFee;

  return {
    orderPrice,
    deliveryFee,
    totalPrice,
  };
};
