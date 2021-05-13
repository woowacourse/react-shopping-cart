import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLOR } from '../../constants/color';
import { Button, ProductImage, BUTTON_TYPE, PRODUCT_IMAGE_TYPE } from '../';

export const ORDER_LIST_ITEM_TYPE = Object.freeze({
  ORDER_PAYMENT: 'ORDER_PAYMENT',
  ORDER_LIST: 'ORDER_LIST',
});

const orderListItemStyle = {
  [ORDER_LIST_ITEM_TYPE.ORDER_PAYMENT]: {
    Container: { width: '731px' },
    TextWrapper: { marginLeft: '18px' },
  },
  [ORDER_LIST_ITEM_TYPE.ORDER_LIST]: {
    TextWrapper: { marginLeft: '33px' },
    Info: { color: COLOR.GRAY_600 },
  },
};

const Container = styled.div`
  display: flex;
  padding: 0 24px;

  ${({ type }) => orderListItemStyle[type].Container};
`;

const TextWrapper = styled.div`
  ${({ type }) => orderListItemStyle[type].TextWrapper}
`;

const Name = styled.div`
  font-size: 20px;
  margin-bottom: 15px;

  ${({ type }) => orderListItemStyle[type].Name}
`;

const Info = styled.div`
  ${({ type }) => orderListItemStyle[type].Info}
`;

const getInfo = ({ type, count, price }) => {
  const infoType = {
    ORDER_PAYMENT: <Info type={type}>수량: {count}</Info>,
    ORDER_LIST: (
      <Info type={type}>
        {price.toLocaleString('ko-KR')}원 / 수량: {count}개
      </Info>
    ),
  };

  return infoType[type];
};

const getFloatingButton = ({ type }) => {
  const buttonType = {
    ORDER_PAYMENT: null,
    ORDER_LIST: (
      <div style={{ marginLeft: 'auto' }}>
        <Button type={BUTTON_TYPE.SMALL}>장바구니</Button>
      </div>
    ),
  };

  return buttonType[type];
};

const OrderListItem = ({ type, src, alt, name, count, price }) => (
  <Container type={type}>
    <ProductImage type={PRODUCT_IMAGE_TYPE.SMALL} src={src} alt={alt} />
    <TextWrapper type={type}>
      <Name type={type}>{name}</Name>
      {getInfo({ type, count, price })}
    </TextWrapper>
    {getFloatingButton({ type })}
  </Container>
);

OrderListItem.propTypes = {
  type: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default OrderListItem;
