import { Header } from '@/components/common';
import { OrderCheckContents } from '@/components/features/order';
import { useLocation } from 'react-router';

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
