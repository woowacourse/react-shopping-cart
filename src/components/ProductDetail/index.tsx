import React from 'react';
import Button from '../shared/Button';
import Container from '../shared/Container';
import {
  AddCartButton,
  PriceContainer,
  ProductImg,
  ProductName,
  StyledProductDetailSection,
} from './styles';

const ProductDetailSection = () => {
  return (
    <StyledProductDetailSection>
      <ProductImg src="https://picsum.photos/300/300" alt="제품이미지" />
      <ProductName>[든든] 스위트콘</ProductName>
      <PriceContainer>
        <span>금액</span>
        <span>99,800원</span>
      </PriceContainer>
      <AddCartButton>장바구니</AddCartButton>
    </StyledProductDetailSection>
  );
};

export default ProductDetailSection;
