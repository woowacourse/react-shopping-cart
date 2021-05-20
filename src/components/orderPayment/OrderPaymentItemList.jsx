import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLOR } from '../../constants/color';
import { OrderPaymentItem } from '..';

const Header = styled.div`
  padding-bottom: 24px;
  border-bottom: 4px solid ${COLOR.GRAY_200};
  font-size: 24px;
  font-weight: 500;
`;

const OrderPaymentItemWrapper = styled.li`
  border-bottom: 2px solid ${COLOR.GRAY_200};
  padding: 20px 0;
`;

const OrderPaymentItemList = ({ orderPaymentItemList }) => (
  <>
    <Header>주문 상품({orderPaymentItemList.length}건)</Header>
    <ul>
      {orderPaymentItemList.map(({ cartId, imageUrl, name, quantity }) => (
        <OrderPaymentItemWrapper key={cartId}>
          <OrderPaymentItem id={cartId} src={imageUrl} alt={name} name={name} quantity={quantity} />
        </OrderPaymentItemWrapper>
      ))}
    </ul>
  </>
);

OrderPaymentItemList.propTypes = {
  orderPaymentItemList: PropTypes.arrayOf(
    PropTypes.shape({
      cartId: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default OrderPaymentItemList;
