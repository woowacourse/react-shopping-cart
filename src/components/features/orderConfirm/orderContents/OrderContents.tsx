import { useNavigate } from 'react-router';
import FooterButton from '../../../common/footerButton/FooterButton';
import useOrderSummary from '../hooks/useOrderSummary';
import OrderList from '../orderList/OrderList';
import OrderPrice from '../orderPrice/OrderPrice';
import OrderTitle from '../orderTitle/OrderTitle';
import * as S from './OrderContents.styles';
import { CouponProvider } from '../../../../global/contexts/CouponContext';
function OrderContents() {
  const order = useOrderSummary();

  const navigate = useNavigate();

  const moveToPayment = () => {
    navigate('/payment');
  };

  return (
    <S.Container>
      <CouponProvider products={order.products}>
        <OrderTitle
          quantity={order.quantity}
          productQuantity={order.totalProductQuantity}
        />
        <OrderList products={order.products} />
        <OrderPrice price={order.price} deliveryFee={order.deliveryFee} />
        <FooterButton onClick={moveToPayment}>결제하기</FooterButton>
      </CouponProvider>
    </S.Container>
  );
}

export default OrderContents;
