import { Header } from '@/components/common';
import {
  calculateOrderPrice,
  calculateTotalProductQuantity,
} from '@/components/features/cart/utils/cartCalculations';
import { useLocation } from 'react-router';
import OrderCheckContents from './components/orderCheckContents/OrderCheckContents';

function OrderCheckPage() {
  const location = useLocation();
  const orderProducts = location.state.orderProducts;

  const orderItemsQuantity = orderProducts.length;
  const totalProductQuantity = calculateTotalProductQuantity(orderProducts);
  const orderPrice = calculateOrderPrice(orderProducts);

  return (
    <>
      <Header showBackButton={true} />
      <OrderCheckContents
        orderItemsQuantity={orderItemsQuantity}
        totalProductQuantity={totalProductQuantity}
        orderPrice={orderPrice}
      />
    </>
  );
}

export default OrderCheckPage;
