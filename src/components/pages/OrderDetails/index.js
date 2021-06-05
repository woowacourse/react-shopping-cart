import { useLocation } from 'react-router';
import OrderItem from '../../OrderItem';
import PaymentSheet from '../../PaymentSheet';
import useOrder from '../../../hooks/useOrder';
import useProducts from '../../../hooks/useProducts';
import {
  OrderDetailWrapper,
  PaymentSheetWrapper,
  PageWrapper,
} from './index.styles';

import { Header } from '../../CompletedOrderList/index.styles';
import { formatPrice } from '../../../utils';
import PageHeader from '../../@common/PageHeader';
import { Page } from '../../@common/PageWrapper/index.styles';
import Loading from '../../@common/Loading';
import useLoading from '../../../hooks/useLoading';
import { useEffect } from 'react';

const OrderDetails = () => {
  const location = useLocation();

  const { loading, timer } = useLoading();
  const { orderedItemDetail } = useOrder();
  const { addToCart } = useProducts();

  const itemDetail = orderedItemDetail(location.state.id);
  const { order_id, order_details } = itemDetail;

  const totalPricePerOrder = order_details.reduce(
    (acc, item) => (acc += item.price),
    0
  );

  useEffect(() => {
    if (loading === false) return;
    timer();

    return clearTimeout(timer());
  }, [loading]);

  return (
    <Page bg="grey">
      {loading && <Loading />}
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
          price={formatPrice(totalPricePerOrder)}
          isButtonVisible={false}
        />
      </PaymentSheetWrapper>
    </Page>
  );
};

export default OrderDetails;
