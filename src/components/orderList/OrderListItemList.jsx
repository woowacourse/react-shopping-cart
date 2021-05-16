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
  padding: 38px 0;
`;

const OrderListItemList = ({ orderNumber, orderListItemList }) => (
  <>
    <Header>
      <div>주문번호 : {orderNumber}</div>
      <Link to={PATH.ORDER_LIST_DETAIL}>상세보기 {'>'} </Link>
    </Header>
    <ul>
      {orderListItemList.map(({ src, id, alt, name, price, count }) => (
        <OrderListItemWrapper key={id}>
          <OrderListItem id={id} src={src} alt={alt} name={name} price={price} count={count} />
        </OrderListItemWrapper>
      ))}
    </ul>
  </>
);

OrderListItemList.propTypes = {
  orderNumber: PropTypes.number,
  orderListItemList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      alt: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default OrderListItemList;
