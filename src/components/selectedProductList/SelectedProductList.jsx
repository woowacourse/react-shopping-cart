import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOR } from '../../constants/color';
import PropTypes from 'prop-types';
import { PATH } from '../../constants/path';

export const SELECTED_PRODUCT_LIST_TYPE = Object.freeze({
  SHOPPING_CART: 'SHOPPING_CART',
  ORDER_PAYMENT: 'ORDER_PAYMENT',
  ORDER_LIST: 'ORDER_LIST',
});

const selectedProductStyle = {
  SHOPPING_CART: {
    Header: {
      paddingBottom: '24px',
      borderBottom: `4px solid ${COLOR.GRAY_200}`,
      fontSize: '20px',
    },
    ListItemWrapper: {
      padding: '24px 0 12px 0',
    },
  },
  ORDER_PAYMENT: {
    Header: {
      paddingBottom: '24px',
      borderBottom: `4px solid ${COLOR.GRAY_200}`,
      fontSize: '24px',
      fontWeight: '500',
    },
    ListItemWrapper: {
      padding: '20px 0',
    },
  },
  ORDER_LIST: {
    Header: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '28px 36px',
      fontSize: '20px',
      backgroundColor: `#F6F6F6`,
      borderBottom: `2px solid ${COLOR.GRAY_200}`,
    },
    ListItemWrapper: {
      padding: '38px 0',
    },
  },
};

const Header = styled.div`
  ${({ type }) => selectedProductStyle[type].Header}
`;

const ListItemWrapper = styled.li`
  border-bottom: 2px solid ${COLOR.GRAY_200};

  ${({ type }) => selectedProductStyle[type].ListItemWrapper}
`;

const getHeader = ({ type, count, orderNumber }) => {
  const headerType = {
    SHOPPING_CART: <Header type={type}>든든배송 상품 ({count}개)</Header>,
    ORDER_PAYMENT: <Header type={type}>주문 상품({count}건)</Header>,
    ORDER_LIST: (
      <Header type={type}>
        <div>주문번호 : {orderNumber}</div>
        <Link to={PATH.ORDER_LIST_DETAIL}>상세보기 {'>'} </Link>
      </Header>
    ),
  };

  return headerType[type];
};

const SelectedProductList = ({ type, orderNumber, productList, ListItem }) => (
  <>
    {getHeader({ type, count: productList.length, orderNumber })}
    <ul>
      {productList.map(({ src, id, alt, name, price, count, isChecked }) => (
        <ListItemWrapper type={type} key={id}>
          <ListItem
            type={type}
            id={id}
            src={src}
            alt={alt}
            name={name}
            price={price}
            count={count}
            isChecked={isChecked}
          />
        </ListItemWrapper>
      ))}
    </ul>
  </>
);

SelectedProductList.propTypes = {
  type: PropTypes.string.isRequired,
  orderNumber: PropTypes.number,
  productList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      alt: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      isChecked: PropTypes.bool,
    }).isRequired
  ).isRequired,
};

export default SelectedProductList;
