import React from 'react';
import CompletedOrderList from '../../CompletedOrderList';
import PageHeader from '../../PageHeader';
import { Main } from './index.styles';

const CompletedOrder = ({ orders }) => (
  <Main>
    <PageHeader>주문목록</PageHeader>
    <ul>
      {orders.map(order => (
        <li key={order.id}>
          <CompletedOrderList order={order} />
        </li>
      ))}
    </ul>
  </Main>
);

export default CompletedOrder;
