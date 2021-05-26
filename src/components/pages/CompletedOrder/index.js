import React from 'react';
import PropTypes from 'prop-types';
import CompletedOrderList from '../../CompletedOrderList';
import PageHeader from '../../PageHeader';
import { Main } from './index.styles';

const CompletedOrder = ({ orders }) => {
  return (
    <Main>
      <PageHeader>주문목록</PageHeader>
      <ul>
        {orders.map(order => (
          <li key={order.order_id}>
            <CompletedOrderList order={order} />
          </li>
        ))}
      </ul>
    </Main>
  );
};

CompletedOrder.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      order_id: PropTypes.string,
      order_details: PropTypes.arrayOf(
        PropTypes.shape({
          product_id: PropTypes.string,
          image_url: PropTypes.string,
          name: PropTypes.string,
          price: PropTypes.number,
          quantity: PropTypes.number,
        })
      ),
    })
  ),
};

export default CompletedOrder;
