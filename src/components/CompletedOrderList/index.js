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
        {products.map(({ id, image, imageAlt, name, price, quantity }) => (
          <li key={id}>
            <OrderItem
              imgUrl={image}
              imgAlt={imageAlt}
              name={name}
              price={price}
              quantity={quantity}
              isOrdered={true}
            />
          </li>
        ))}
      </ul>
    </OrderList>
  );
};

CompletedOrderList.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        imageAlt: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
      })
    ),
  }),
};

export default CompletedOrderList;
