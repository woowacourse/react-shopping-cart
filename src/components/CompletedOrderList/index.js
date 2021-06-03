import React from 'react';
import PropTypes from 'prop-types';
import OrderItem from '../OrderItem';
import { Header, OrderList } from './index.styles';

const CompletedOrderList = ({ orderId, products }) => {
  return (
    <OrderList>
      <Header>
        <span>주문번호 : {orderId}</span>
        <span>상세보기 ᐳ </span>
      </Header>
      <ul>
        {/* TODO: Backend API에 맞게 Key 수정 */}
        {products.map(product => (
          <li key={product.id}>
            <OrderItem {...product} isCartButtonVisible={true} />
          </li>
        ))}
      </ul>
    </OrderList>
  );
};

CompletedOrderList.propTypes = {
  orderId: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      imgUrl: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ),
};

export default CompletedOrderList;
