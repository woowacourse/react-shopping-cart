import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../constants/color';
import PropTypes from 'prop-types';
import OrderPaymentItem from '../orderPayment/OrderPaymentItem';

const Header = styled.div`
  padding-bottom: 24px;
  border-bottom: 4px solid ${COLOR.GRAY_200};
  font-size: 24px;
  font-weight: 500;
`;

const OrderPaymentItemWrapper = styled.div`
  padding: 20px 0;
  border-bottom: 2px solid ${COLOR.GRAY_200};
`;

const OrderPaymentItemList = ({ orderPaymentItemList }) => (
  <>
    <Header>주문 상품({orderPaymentItemList.length}건)</Header>
    <ul>
      {orderPaymentItemList.map(({ cart_id, image_url, name, quantity }) => (
        <OrderPaymentItemWrapper key={cart_id}>
          <OrderPaymentItem image_url={image_url} alt={name} name={name} quantity={quantity}></OrderPaymentItem>
        </OrderPaymentItemWrapper>
      ))}
    </ul>
  </>
);

OrderPaymentItemList.propTypes = {
  orderPaymentItemList: PropTypes.arrayOf(
    PropTypes.shape({
      cart_id: PropTypes.number.isRequired,
      image_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default OrderPaymentItemList;
