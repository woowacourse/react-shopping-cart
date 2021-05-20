import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COLOR } from '../../constants/color';
import { PATH } from '../../constants/path';
import { OrderListItem } from '..';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 28px 36px;
  font-size: 20px;
  background-color: ${COLOR.GRAY_100};
  border-bottom: 2px solid ${COLOR.GRAY_200};
`;

const OrderListItemWrapper = styled.li`
  border-bottom: 2px solid ${COLOR.GRAY_200};
  background-color: ${COLOR.WHITE};
  padding: 38px 0;
`;

const OrderListItemList = ({ orderId, orderListItemList, hasDetailLink }) => (
  <>
    <Header>
      <div>주문번호 : {orderId}</div>
      {hasDetailLink && (
        <Link to={{ pathname: `${PATH.ORDER_LIST}/${orderId}`, state: { id: orderId } }}>상세보기 {'>'} </Link>
      )}
    </Header>
    <ul>
      {orderListItemList.map(({ productId, imageUrl, name, price, quantity }) => (
        <OrderListItemWrapper key={productId}>
          <OrderListItem id={productId} src={imageUrl} alt={name} name={name} price={price} quantity={quantity} />
        </OrderListItemWrapper>
      ))}
    </ul>
  </>
);

OrderListItemList.defaultProps = {
  hasDetailLink: true,
};

OrderListItemList.propTypes = {
  orderId: PropTypes.number.isRequired,
  orderListItemList: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  hasDetailLink: PropTypes.bool,
};

export default OrderListItemList;
