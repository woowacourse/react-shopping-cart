import { useLocation } from 'react-router-dom';

import { OrderConfirm } from '../features/Order/Confirm/components/OrderConfirm';

export const OrderConfirmPage = () => {
  const location = useLocation();
  const confirm = location.state;

  const { cartItems, totalDiscountPrice } = confirm || {};

  if (location.state === null) {
    return <div>존재하지 않습니다.</div>;
  }

  return <OrderConfirm cartItems={cartItems} totalDiscountPrice={totalDiscountPrice} />;
};
