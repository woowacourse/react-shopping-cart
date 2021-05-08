import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOR } from '../../constants/color';

export const TYPE = Object.freeze({
  SHOPPING_CART: 'SHOPPING_CART',
  ORDER_PAYMENT: 'ORDER_PAYMENT',
  ORDER_LIST: 'ORDER_LIST',
});

const selectedProductStyle = {
  SHOPPING_CART: {
    paddingBottom: '24px',
    borderBottom: `4px solid ${COLOR.GRAY_400}`,
    fontSize: '20px',
  },

  ORDER_PAYMENT: {
    paddingBottom: '24px',
    borderBottom: `4px solid ${COLOR.GRAY_400}`,
    fontSize: '24px',
    fontWeight: '500',
  },
};

const Header = styled.div`
  ${({ type }) => selectedProductStyle[type]}
`;

const ListItemWrapper = styled.li`
  border-bottom: 2px solid ${COLOR.GRAY_200};
  margin-top: 24px;
  padding-bottom: 12px;
`;

const getHeader = ({ type, count, orderNumber }) => {
  const headerType = {
    SHOPPING_CART: <Header type={type}>든든배송 상품 ({count}개)</Header>,
    ORDER_PAYMENT: <Header type={type}>주문 상품({count}건)</Header>,
    ORDER_LIST: (
      <Header type={type}>
        <div>주문번호 : {orderNumber}</div>
        <Link>상세보기{'>'} </Link>
      </Header>
    ),
  };

  return headerType[type];
};

const SelectedProductList = ({ type, orderNumber, count, productList, ListItem }) => (
  <>
    {getHeader({ type, count, orderNumber })}
    <ul>
      {productList.map(({ src, id, alt, name, price }) => (
        <ListItemWrapper key={id}>
          <ListItem src={src} alt={alt} name={name} price={price} />
        </ListItemWrapper>
      ))}
    </ul>
  </>
);

export default SelectedProductList;
