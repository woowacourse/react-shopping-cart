import React from 'react';

import CompletedOrderList from '../../CompletedOrderList';
import PageHeader from '../../PageHeader';
import { Empty, Main } from './index.styles';
import { useSelector } from 'react-redux';

const CompletedOrder = () => {
  const { totalOrders } = useSelector(({ order }) => order);

  return (
    <Main>
      <PageHeader>주문목록</PageHeader>
      {totalOrders.length > 0 ? (
        <ul>
          {totalOrders.map(({ id, products }) => (
            <li key={id}>
              <CompletedOrderList orderId={id} products={products} />
            </li>
          ))}
        </ul>
      ) : (
        <Empty>주문하신 상품이 없습니다.</Empty>
      )}
    </Main>
  );
};

export default CompletedOrder;
