import HighlightText from 'components/shared/HighlightText/HighlightText';
import PageHeader from 'components/shared/PageHeader/PageHeader';
import PriceOverview from 'components/units/PriceOverview/PriceOverview';
import PurchasedItem from 'components/units/PurchasedItem/PurchasedItem';
import useAddCart from 'hooks/useAddCart';
import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { CartItem, Order, Product } from 'types';
import Styled from './OrderDetailPage.styles';

type LocationState = {
  order: Order;
};

const OrderDetailPage = () => {
  const location = useLocation<LocationState>();
  const addCart = useAddCart();

  if (!location.state) return <Redirect to="/order-list" />;

  const { order } = location.state;

  const totalPrice = order.items
    .map((item) => item.product.price * item.quantity) //
    .reduce((acc, price) => acc + price);

  const handleClickCart = (product: Product) => {
    addCart(product);
  };

  return (
    <Styled.Root>
      <PageHeader title="주문내역상세" />
      <Styled.OrderList>
        <Styled.Order>
          <Styled.OrderHeader>
            <Styled.OrderNumber>주문번호 : {order.id}</Styled.OrderNumber>
          </Styled.OrderHeader>
          <Styled.PurchasedList>
            {order.items.map((item) => (
              <PurchasedItem key={item.id} item={item} onClick={() => handleClickCart(item.product)} />
            ))}
          </Styled.PurchasedList>
        </Styled.Order>
      </Styled.OrderList>
      <Styled.PriceOverviewWrapper>
        <PriceOverview headerText="결제금액 정보">
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
