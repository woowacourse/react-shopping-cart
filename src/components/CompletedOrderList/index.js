import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import OrderItem from '../OrderItem';
import { Header, OrderList } from './index.styles';
import { handleCartButtonClick } from '../pages/Products/index.actions';
import { useDispatch, useSelector } from 'react-redux';

const CompletedOrderList = ({ order, onImageError }) => {
  const { order_id, order_details } = order;
  const cartItems = useSelector(({ product }) => product.cartItems) ?? [];

  const dispatch = useDispatch();

  const addToCart = product => {
    handleCartButtonClick(product, cartItems, dispatch);
  };

  return (
    <OrderList>
      <Header>
        <span>주문번호 : {order_id}</span>
        <button onClick={() => {}}>
          <span>상세보기 ᐳ</span>
        </button>
      </Header>
      <ul>
        {order_details.map(product => (
          <li key={product.product_id}>
            <OrderItem
              image_url={product.image_url}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              isCartButtonVisible={true}
              addToCart={() => addToCart(product)}
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
