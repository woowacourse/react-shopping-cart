import React from 'react';
import Checkbox from '../checkbox/Checkbox';
import ProductImage, { TYPE } from '../productImage/ProductImage';
import trashCan from '../../assets/trashCan.svg';
import styled from 'styled-components';
import CountInput from '../countInput/CountInput';

const Container = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 731px;
  height: 156px;
`;

const LeftContent = styled.li`
  display: flex;
  & > *:not(:first-child) {
    margin-left: 15px;
  }
`;

const RightContent = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 5px;
`;

const Name = styled.div`
  font-size: 20px;
`;

const TrashCanImage = styled.img`
  width: 24px;
  height: 24px;
`;

const ShoppingCartItem = ({ src, alt, name, price }) => (
  <Container>
    <LeftContent>
      <Checkbox />
      <ProductImage type={TYPE.SMALL} src={src} alt={alt} />
      <Name>{name}</Name>
    </LeftContent>
    <RightContent>
      <TrashCanImage src={trashCan} alt="쓰레기통" />
      <CountInput />
      <div>{price.toLocaleString('ko-KR')} 원</div>
    </RightContent>
  </Container>
);

export default ShoppingCartItem;
