import { useLocation } from 'react-router';
import PageHeader from '../../@common/PageHeader';
import PageWrapper from '../../@common/PageWrapper';
import OrderItem from '../../OrderItem';
import PaymentSheet from '../../PaymentSheet';
import useOrder from '../../../hooks/useOrder';
import useProducts from '../../../hooks/useProducts';
import { OrderDetailWrapper, PaymentSheetWrapper } from './index.styles';
import { Header } from '../../CompletedOrderList/index.styles';

const OrderDetails = () => {
  const location = useLocation();

  const { orderedItemDetail } = useOrder();
  const { addToCart } = useProducts();

  const itemId = location.state.id;
  const itemDetail = orderedItemDetail(itemId);
  const { order_id, order_details } = itemDetail;

  const totalPricePerOrder = order_details.reduce(
    (acc, item) => (acc += item.price),
    0
  );

  return (
    <PageWrapper bg="grey">
      <PageHeader>주문내역상세</PageHeader>
      <OrderDetailWrapper>
        <Header hover={false}>
          <span>주문번호 : {order_id}</span>
        </Header>
        <ul>
          <li key={order_id}>
            {order_details &&
              order_details.map(item => (
                <OrderItem
                  image_url={item.image_url}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  isCartButtonVisible={true}
                  addToCart={() => addToCart(item)}
                />
              ))}
          </li>
        </ul>
      </OrderDetailWrapper>
      <PaymentSheetWrapper>
        <PaymentSheet
          title="결제금액 정보"
          priceInfo="총 결제 금액"
          price={totalPricePerOrder}
          isButtonVisible={false}
        />
      </PaymentSheetWrapper>
    </PageWrapper>
  );
};

export default OrderDetails;
