import React from 'react';
import Checkbox from '../checkbox/Checkbox';
import ProductImage, { SIZE } from '../productImage/ProductImage';
import trashCan from '../../assets/trashCan.svg';
import styled from 'styled-components';
import NumberInput from '../numberInput/NumberInput';

const StyledShoppingCartItemContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 731px;
  height: 156px;
`;

const StyledLeftLi = styled.li`
  display: flex;
  & > * {
    margin-left: 15px;
  }
`;

const StyledRightLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding-bottom: 5px;
`;

const StyledName = styled.div`
  font-size: 20px;
`;

const StyledTrashCan = styled.img`
  width: 24px;
  height: 24px;
`;

const ShoppingCartItem = ({ src, alt, name, price }) => (
  <StyledShoppingCartItemContainer>
    <StyledLeftLi>
      <Checkbox />
      <ProductImage size={SIZE.SMALL} src={src} alt={alt} />
      <StyledName>{name}</StyledName>
    </StyledLeftLi>
    <StyledRightLi>
      <StyledTrashCan src={trashCan} alt="쓰레기통" />
      <NumberInput />
      <div>{price.toLocaleString('ko-KR')} 원</div>
    </StyledRightLi>
  </StyledShoppingCartItemContainer>
);

export default ShoppingCartItem;
