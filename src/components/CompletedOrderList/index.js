import React from 'react';
import PropTypes from 'prop-types';
import OrderItem from '../OrderItem';
import { Header, OrderList } from './index.styles';
import useProduct from '../../hooks/useProduct';

const CompletedOrderList = ({ orderId, products }) => {
  const { addToCart } = useProduct();

  return (
    <OrderList>
      <Header>
        <span>주문번호 : {orderId}</span>
        <span>상세보기 ᐳ </span>
      </Header>
      <ul>
        {products.map(product => (
          <OrderItem
            key={product.product_id}
            {...product}
            isOrdered={true}
            onCartButtonClick={() => addToCart(product)}
          />
        ))}
      </ul>
    </OrderList>
  );
};

CompletedOrderList.propTypes = {
  orderId: PropTypes.number,
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
