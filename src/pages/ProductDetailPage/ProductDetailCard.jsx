import React from "react";
import styled from "styled-components";

import BoxButton from "../../components/common/BoxButton";

function ProductDetailCard({ product: { id, thumbnailUrl, name, price } }) {
  return (
    <Container>
      <Top>
        <ProductImage src={thumbnailUrl} />
        <ProductName>{name}</ProductName>
      </Top>
      <Bottom>
        <PriceText>금액</PriceText>
        <ProductPrice>{price.toLocaleString()}원</ProductPrice>
      </Bottom>
      <AddToCartButton />
    </Container>
  );
}

function AddToCartButton() {
  return (
    <BoxButton
      onClick={() => {
        alert("🛒아직입니다~~^^🛒");
      }}
      bgColor="#73675C"
    >
      장바구니 담기
    </BoxButton>
  );
}

const Container = styled.section`
  width: 400px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid ${({ theme }) => theme.color.darkGrey};
  padding: 16px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 20px;
`;

const ProductImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ProductName = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.darkGrey};
  padding: 8px 0;
`;

const PriceText = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.darkGrey};
  margin: auto 0;
`;

const ProductPrice = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.color.darkGrey};
`;

export default ProductDetailCard;
