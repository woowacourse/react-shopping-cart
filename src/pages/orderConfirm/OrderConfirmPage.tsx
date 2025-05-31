import { useLocation, useNavigate } from 'react-router';
import Header from '../../components/common/header/Header';
import {
  calculateOrderPrice,
  calculateTotalProductQuantity,
} from '../../components/features/cart/utils/cartCalculations';
import OrderConfirmContents from './components/orderConfirmContents/OrderConfirmContents';
import BackButton from '../../components/common/backButton/BackButton';

function OrderConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderProducts = location.state.orderProducts;

  const orderItemsQuantity = orderProducts.length;
  const totalProductQuantity = calculateTotalProductQuantity(orderProducts);
  const orderPrice = calculateOrderPrice(orderProducts);

  const goBack = () => navigate(-1);

  return (
    <>
      <Header leftArea={<BackButton onClick={goBack} />} />
      <OrderConfirmContents
        orderItemsQuantity={orderItemsQuantity}
        totalProductQuantity={totalProductQuantity}
        orderPrice={orderPrice}
      />
    </>
  );
}

export default OrderConfirmPage;
