import FooterButton from '../../../common/footerButton/FooterButton';
import useOrderSummary from '../hooks/useOrderSummary';
import OrderList from '../orderList/OrderList';
import OrderPrice from '../orderPrice/OrderPrice';
import OrderTitle from '../orderTitle/OrderTitle';
import * as S from './OrderContents.styles';
function OrderContents() {
  const order = useOrderSummary();

  return (
    <S.Container>
      <OrderTitle
        quantity={order.quantity}
        productQuantity={order.totalProductQuantity}
      />
      <OrderList products={order.products} />
      <OrderPrice />
      <FooterButton>결제하기</FooterButton>
    </S.Container>
  );
}

export default OrderContents;
