import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import PageHeader from '../../common/PageHeader';
import PageWrapper from '../../common/PageWrapper';
import { Header } from '../../CompletedOrderList/index.styles';
import OrderItem from '../../OrderItem';
import PaymentSheet from '../../PaymentSheet';
import { OrderDetailWrapper, PaymentSheetWrapper } from './index.styles';

const OrderDetails = () => {
  const location = useLocation();
  const orderItem = useSelector(state =>
    state.product.product.orderedItems.find(
      ({ order_id }) => order_id === location.state.id
    )
  );
  const { order_id, order_details } = orderItem;
  const totalPrice = order_details.reduce(
    (acc, item) => (acc += item.price),
    0
  );

  return (
    <PageWrapper bg="grey">
      <PageHeader>주문내역상세</PageHeader>
      <OrderDetailWrapper>
        <Header>
          <span>주문번호 : {order_id}</span>
        </Header>
        <ul>
          <li key={order_id}>
            {order_details.map(item => (
              <OrderItem
                image_url={item.image_url}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                isCartButtonVisible={true}
                addToCart={() => {}}
              />
            ))}
          </li>
        </ul>
      </OrderDetailWrapper>
      <PaymentSheetWrapper>
        <PaymentSheet
          title="결제금액 정보"
          priceInfo="총 결제 금액"
          price={totalPrice}
          isButtonVisible={false}
        />
      </PaymentSheetWrapper>
    </PageWrapper>
  );
};

export default OrderDetails;
