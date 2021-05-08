import React from 'react';
import OrderListItem from '../components/orderListItem/OrderListItem';

const OrderPayment = ({ productListState }) => (
  <>
    <OrderListItem
      src={productListState[0].src}
      alt={productListState[0].alt}
      name={productListState[0].name}
      count={1}
    />
  </>
);

export default OrderPayment;
