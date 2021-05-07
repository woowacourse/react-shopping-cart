import React from 'react';
import PageHeader from '../../components/shared/PageHeader/PageHeader';
import PurchasedItem from '../../components/units/PurchasedItem/PurchasedItem';
import Styled from './OrderListPage.styles';

const OrderListPage = () => {
  return (
    <Styled.Root>
      <PageHeader title="주문 목록" />
      <Styled.OrderList>
        <Styled.Order>
          <Styled.OrderHeader>
            <Styled.OrderNumber>주문번호 : 1</Styled.OrderNumber>
            <Styled.DetailButton>{'상세보기 >'}</Styled.DetailButton>
          </Styled.OrderHeader>
          <Styled.PurchasedList>
            <PurchasedItem title="브레이브 용기스" quantity={1} price={39800} />
            <PurchasedItem title="브레이브 용기스" quantity={1} price={39800} />
            <PurchasedItem title="브레이브 용기스" quantity={1} price={39800} />
          </Styled.PurchasedList>
        </Styled.Order>
        <Styled.Order>
          <Styled.OrderHeader>
            <Styled.OrderNumber>주문번호 : 1</Styled.OrderNumber>
            <Styled.DetailButton>{'상세보기 >'}</Styled.DetailButton>
          </Styled.OrderHeader>
          <Styled.PurchasedList>
            <PurchasedItem title="브레이브 용기스" quantity={1} price={39800} />
            <PurchasedItem title="브레이브 용기스" quantity={1} price={39800} />
            <PurchasedItem title="브레이브 용기스" quantity={1} price={39800} />
          </Styled.PurchasedList>
        </Styled.Order>
      </Styled.OrderList>
    </Styled.Root>
  );
};

export default OrderListPage;
