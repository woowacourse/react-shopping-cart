import { useLocation } from 'react-router-dom';

import { EmptyOrder } from '@/features/Order/Confirm/components/EmptyOrder';

import { OrderConfirm } from '../features/Order/Confirm/components/OrderConfirm';

export const OrderConfirmPage = () => {
  const location = useLocation();
  const confirm = location.state;

  const { cartItems, totalDiscountPrice } = confirm || {};

  if (location.state === null) {
    return <EmptyOrder />;
  }

  return <OrderConfirm cartItems={cartItems} totalDiscountPrice={totalDiscountPrice} />;
};
