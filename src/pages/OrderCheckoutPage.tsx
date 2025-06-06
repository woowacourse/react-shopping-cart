import { useLocation } from 'react-router-dom';

import { OrderCheckout } from '@/features/Order/Checkout/components/OrderCheckout';

export const OrderCheckoutPage = () => {
  const location = useLocation();
  const cartItems = location.state;

  if (cartItems === null) {
    return <div>없습니다.</div>;
  }

  return <OrderCheckout cartItems={cartItems} />;
};
