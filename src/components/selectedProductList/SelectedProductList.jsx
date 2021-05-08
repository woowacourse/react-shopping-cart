import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOR } from '../../constants/color';

// TODO: TYPE을 그냥 길게 다 써주기
export const TYPE = Object.freeze({
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
      borderBottom: `2px solid ${COLOR.GRAY_200}`,
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
      borderBottom: `2px solid ${COLOR.GRAY_200}`,
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
      borderBottom: `2px solid ${COLOR.GRAY_200}`,
      padding: '38px 0',
    },
  },
};

const Header = styled.div`
  ${({ type }) => selectedProductStyle[type].Header}
`;

const ListItemWrapper = styled.li`
  ${({ type }) => selectedProductStyle[type].ListItemWrapper}
`;

const getHeader = ({ type, count, orderNumber }) => {
  const headerType = {
    SHOPPING_CART: <Header type={type}>든든배송 상품 ({count}개)</Header>,
    ORDER_PAYMENT: <Header type={type}>주문 상품({count}건)</Header>,
    ORDER_LIST: (
      <Header type={type}>
        <div>주문번호 : {orderNumber}</div>
        <Link>상세보기 {'>'} </Link>
      </Header>
    ),
  };

  return headerType[type];
};

const SelectedProductList = ({ listType, itemType, orderNumber, productList, ListItem }) => (
  <>
    {getHeader({ type: listType, count: productList.length, orderNumber })}
    <ul>
      {productList.map(({ src, id, alt, name, price, count = 1 }) => (
        <ListItemWrapper type={listType} key={id}>
          <ListItem type={itemType} src={src} alt={alt} name={name} price={price} count={count} />
        </ListItemWrapper>
      ))}
    </ul>
  </>
);

export default SelectedProductList;
