import React from 'react';
import ProductImage, { SIZE } from '../productImage/ProductImage';
import shoppingCartImg from '../../assets/shoppingCart.svg';
import styled from 'styled-components';

const StyledUl = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 12px 0 12px;
`;

const StyledName = styled.div`
  letter-spacing: 0.5px;
  line-height: 22px;
`;

const StyledPrice = styled.div`
  font-size: 20px;
  margin-top: 3px;
  letter-spacing: 0.5px;
  line-height: 27px;
`;

const ProductListItem = ({ src, name, price, alt }) => (
  <div>
    <ProductImage size={SIZE.MEDIUM} src={src} alt={alt} />
    <StyledUl>
      <li>
        <StyledName>{name}</StyledName>
        <StyledPrice>{price.toLocaleString('ko-KR')} 원</StyledPrice>
      </li>
      <li>
        <img src={shoppingCartImg} alt="장바구니" />
      </li>
    </StyledUl>
  </div>
);

export default ProductListItem;
