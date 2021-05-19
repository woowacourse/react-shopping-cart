import React from 'react';
import PropTypes from 'prop-types';
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

CompletedOrder.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          image: PropTypes.string,
          name: PropTypes.string,
          price: PropTypes.number,
        })
      ),
    })
  ),
};

export default CompletedOrder;
