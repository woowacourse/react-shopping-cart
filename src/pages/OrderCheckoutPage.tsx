import { useLocation } from 'react-router-dom';

import { OrderCheckout } from '@/features/Order/Checkout/components/OrderCheckout';
import { isCartItemArray } from '@/features/Order/Checkout/utils/isCartItemArray';
import { EmptyOrder } from '@/features/Order/Confirm/components/EmptyOrder';

export const OrderCheckoutPage = () => {
  const location = useLocation();
  const cartItems = location.state;

  if (!isCartItemArray(cartItems)) {
    return <EmptyOrder />;
  }

  return <OrderCheckout cartItems={cartItems} />;
};
