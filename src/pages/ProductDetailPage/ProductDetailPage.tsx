import React from 'react';
import Styled from './ProductDetailPage.styles';

const ProductDetailPage = () => {
  return (
    <Styled.Root>
      <Styled.ImageWrapper>
        <Styled.Image />
      </Styled.ImageWrapper>
      <Styled.Title> 든든 옥수수캔</Styled.Title>
      <Styled.Divider />
      <Styled.PriceWrapper>
        <Styled.PriceWrapperTitle>금액</Styled.PriceWrapperTitle>
        <Styled.PriceWrapperPrice>1,000 원</Styled.PriceWrapperPrice>
      </Styled.PriceWrapper>
      <Styled.Button>장바구니</Styled.Button>
    </Styled.Root>
  );
};

export default ProductDetailPage;
