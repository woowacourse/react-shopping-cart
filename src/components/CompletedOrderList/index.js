import React from 'react';
import PropTypes from 'prop-types';
import OrderItem from '../OrderItem';
import { Header, OrderList } from './index.styles';

const CompletedOrderList = ({ order }) => {
  const { id, products } = order;

  return (
    <OrderList>
      <Header>
        <span>주문번호 : {id}</span>
        <span>상세보기 ᐳ </span>
      </Header>
      <ul>
        {/* TODO: Backend API에 맞게 Key 수정 */}
        {products.map(({ id, imgUrl, name, price, quantity }) => (
          <li key={id}>
            <OrderItem
              imgUrl={imgUrl}
              name={name}
              price={price}
              quantity={quantity}
              isCartButtonVisible={true}
            />
          </li>
        ))}
      </ul>
    </OrderList>
  );
};

CompletedOrderList.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        imgUrl: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
      })
    ),
  }),
};

export default CompletedOrderList;
