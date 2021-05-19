import React from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from 'components/shared/PageHeader/PageHeader';
import PurchasedItem from 'components/units/PurchasedItem/PurchasedItem';
import HighlightText from 'components/shared/HighlightText/HighlightText';
import PriceOverview from 'components/units/PriceOverview/PriceOverview';
import useAddCartItem from 'hooks/useAddCartItem';
import * as T from 'types';
import Styled from './OrderDetailPage.styles';

interface LocationState {
  order: T.Order;
}

const OrderDetailPage = () => {
  const location = useLocation<LocationState>();
  const { order } = location.state;

  const addCartItem = useAddCartItem();

  const handleClickCart = (orderItem: T.OrderItem) => {
    const product: T.Product = { ...orderItem };
    addCartItem(product);
  };

  const totalPrice = order.orderDetails.reduce((acc: number, curr: T.OrderItem) => acc + curr.price * curr.quantity, 0);

  return (
    <Styled.Root>
      <PageHeader title="주문내역상세" />
      <Styled.Order key={order.orderId}>
        <Styled.OrderHeader>
          <Styled.OrderNumber>주문번호 : {order.orderId}</Styled.OrderNumber>
        </Styled.OrderHeader>
        <Styled.PurchasedList>
          {order.orderDetails.map((item) => (
            <PurchasedItem key={item.productId} item={item} onClick={handleClickCart} />
          ))}
        </Styled.PurchasedList>
      </Styled.Order>
      <Styled.PriceOverviewWrapper>
        <PriceOverview headerText="결제금액 정보" border={false}>
          <Styled.HighlightTextWrapper>
            <HighlightText text="총 결제금액" />
            <HighlightText text={`${totalPrice.toLocaleString('ko-KR')}원`} />
          </Styled.HighlightTextWrapper>
        </PriceOverview>
      </Styled.PriceOverviewWrapper>
    </Styled.Root>
  );
};

export default OrderDetailPage;
