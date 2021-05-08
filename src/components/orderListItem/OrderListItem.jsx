import React from 'react';
import styled from 'styled-components';
import ProductImage, { TYPE } from '../productImage/ProductImage';

const Container = styled.div`
  display: flex;
  width: 731px;
`;

const TextWrapper = styled.div`
  margin-left: 18px;
`;

const Name = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
`;

const OrderListItem = ({ src, alt, name, count }) => (
  <Container>
    <ProductImage type={TYPE.SMALL} src={src} alt={alt} />
    <TextWrapper>
      <Name>{name}</Name>
      <div>수량 : {count}</div>
    </TextWrapper>
  </Container>
);

export default OrderListItem;
