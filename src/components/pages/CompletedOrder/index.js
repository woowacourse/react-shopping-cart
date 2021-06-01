import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CompletedOrderList from '../../CompletedOrderList';
import PageHeader from '../../common/PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompletedOrder } from './index.actions';
import PageWrapper from '../../common/PageWrapper';

const CompletedOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.product.product.orderedItems);

  useEffect(() => {
    dispatch(fetchCompletedOrder());
  }, []);

  return (
    <PageWrapper bg="grey">
      <PageHeader>주문목록</PageHeader>
      <ul>
        {orders.length > 0 &&
          orders.map(order => (
            <li key={order.order_id}>
              <CompletedOrderList order={order} />
            </li>
          ))}
      </ul>
    </PageWrapper>
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
