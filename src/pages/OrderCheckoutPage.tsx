import { useLocation } from 'react-router-dom';

import { OrderCheckout } from '@/features/Order/Checkout/components/OrderCheckout';
import { EmptyOrder } from '@/features/Order/Confirm/components/EmptyOrder';

export const OrderCheckoutPage = () => {
  const location = useLocation();
  const cartItems = location.state;

  if (cartItems === null) {
    return <EmptyOrder />;
  }

  return <OrderCheckout cartItems={cartItems} />;
};
