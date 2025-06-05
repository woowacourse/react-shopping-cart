import { Header } from '@/components/common';
import { useLocation } from 'react-router';
import OrderCheckContents from './components/orderCheckContents/OrderCheckContents';
import { useJaeO } from '@/shared/data/useJaeO';
import { getCoupons } from '@/components/features/coupon/api/getCoupons';

function OrderCheckPage() {
  const location = useLocation();
  const orderProducts = location.state.orderProducts;
  const { data } = useJaeO({
    fetchKey: 'coupons',
    fetchFn: getCoupons,
  });

  console.log('Coupons:', data);

  return (
    <>
      <Header showBackButton={true} />
      <OrderCheckContents orderItems={orderProducts} />
    </>
  );
}

export default OrderCheckPage;
