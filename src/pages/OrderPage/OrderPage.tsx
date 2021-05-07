import React from 'react';
import { Link } from 'react-router-dom';
import Styled from './OrderPage.styles';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import PriceOverview from '../../components/units/PriceOverview/PriceOverview';
import HighlightText from '../../components/shared/HighlightText/HighlightText';
import Button from '../../components/shared/Button/Button';
import OrderItem from '../../components/units/OrderItem/OrderItem';
import * as T from '../../types';

const OrderPage = () => {
  return (
    <Styled.Root>
      <PageHeader title="주문/결제" />
      <Styled.Order>
        <Styled.OrderListContainer>
          <Styled.OrderListHeader>주문 상품(3건)</Styled.OrderListHeader>
          <Styled.OrderItemList>
            <OrderItem title="브레이브 용기스" quantity={1} />
            <OrderItem title="브레이브 용기스" quantity={1} />
            <OrderItem title="브레이브 용기스" quantity={1} />
          </Styled.OrderItemList>
        </Styled.OrderListContainer>

        <Styled.PriceOverviewWrapper>
          <PriceOverview headerText="결제금액">
            <Styled.HighlightTextWrapper>
              <HighlightText text="총 결제금액" />
              <HighlightText text="325,600원" />
            </Styled.HighlightTextWrapper>
            <Link to="/order/complete">
              <Button text="325,600원 결제하기" size={T.ButtonSize.LARGE} />
            </Link>
          </PriceOverview>
        </Styled.PriceOverviewWrapper>
      </Styled.Order>
    </Styled.Root>
  );
};

export default OrderPage;
