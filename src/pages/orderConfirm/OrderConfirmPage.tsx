import { useLocation } from 'react-router';
import Header from '../../components/common/header/Header';
import OrderConfirmContents from './components/orderConfirmContents/OrderConfirmContents';
import Body from '../../components/common/body/Body';
import {
  calculateOrderPrice,
  calculateTotalProductQuantity,
} from '../../components/features/cart/utils/cartCalculations';

function OrderConfirmPage() {
  const location = useLocation();
  const orderProducts = location.state.orderProducts;

  const orderItemsQuantity = orderProducts.length;
  const totalProductQuantity = calculateTotalProductQuantity(orderProducts);
  const orderPrice = calculateOrderPrice(orderProducts);

  console.log(location.state.orderProducts);

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
