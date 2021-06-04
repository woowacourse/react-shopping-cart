import PageHeader from 'components/shared/PageHeader/PageHeader';
import PurchasedItem from 'components/units/PurchasedItem/PurchasedItem';
import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Order } from 'types';
import Styled from './OrderDetailPage.styles';

type LocationState = {
  order: Order;
};

const OrderDetailPage = () => {
  const location = useLocation<LocationState>();

  if (!location.state) return <Redirect to="/order-list" />;

  const { order } = location.state;

  return (
    <Styled.Root>
      <PageHeader title="주문내역상세" />
      <Styled.OrderList>
        <Styled.Order>
          <Styled.OrderHeader>
            <Styled.OrderNumber>주문번호 :</Styled.OrderNumber>
          </Styled.OrderHeader>
          <Styled.PurchasedList>
            {/* {order.items.map((item) => (
              <PurchasedItem key={item.id} item={item} onClick={handleClickCart} />
            ))} */}
          </Styled.PurchasedList>
        </Styled.Order>
      </Styled.OrderList>
    </Styled.Root>
  );
};

export default OrderDetailPage;
