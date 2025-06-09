import { CartItem } from '@/features/Cart/types/Cart.types';
import { FREE_DELIVERY_THRESHOLD } from '../constants/price';

type usePriceInfoProps = {
  cartItems: CartItem[];
  isRemoteArea: boolean;
};

export const usePriceInfo = ({ cartItems, isRemoteArea }: usePriceInfoProps) => {
  const orderPrice = cartItems
    .filter((item) => item.quantity > 0 && item.isChecked)
    .reduce((acc, cart) => {
      return acc + Number(cart.product.price) * Number(cart.quantity);
    }, 0);

  const BASE_DELIVERY = 3000;
  const REMOTE_EXTRA = isRemoteArea ? 3000 : 0;

  const deliveryFee = orderPrice >= FREE_DELIVERY_THRESHOLD ? 0 : BASE_DELIVERY + REMOTE_EXTRA;

  const totalPrice = orderPrice + deliveryFee;

  return {
    orderPrice,
    deliveryFee,
    totalPrice,
  };
};
