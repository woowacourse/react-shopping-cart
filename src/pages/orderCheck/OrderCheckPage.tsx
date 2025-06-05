import { Header } from '@/components/common';
import { useLocation } from 'react-router';
import OrderCheckContents from './components/orderCheckContents/OrderCheckContents';

function OrderCheckPage() {
  const location = useLocation();
  const orderProducts = location.state.orderProducts;

  return (
    <>
      <Header showBackButton={true} />
      <OrderCheckContents orderItems={orderProducts} />
    </>
  );
}

export default OrderCheckPage;
