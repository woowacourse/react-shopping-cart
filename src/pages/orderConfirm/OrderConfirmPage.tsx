import { useLocation } from 'react-router';
import Body from '../../components/common/body/Body';
import Header from '../../components/common/header/Header';
import {
  calculateOrderPrice,
  calculateTotalProductQuantity,
} from '../../components/features/cart/utils/cartCalculations';
import OrderConfirmContents from './components/orderConfirmContents/OrderConfirmContents';

function OrderConfirmPage() {
  const location = useLocation();
  const orderProducts = location.state.orderProducts;

  const orderItemsQuantity = orderProducts.length;
  const totalProductQuantity = calculateTotalProductQuantity(orderProducts);
  const orderPrice = calculateOrderPrice(orderProducts);

  return (
    <>
      <Header showBackButton={true} />
      <Body>
        <OrderConfirmContents
          orderItemsQuantity={orderItemsQuantity}
          totalProductQuantity={totalProductQuantity}
          orderPrice={orderPrice}
        />
      </Body>
    </>
  );
}

export default OrderConfirmPage;
