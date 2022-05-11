import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import AddToCartButton from "./AddToCartButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 360px;
  border: 1px solid #ddd;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 282px;

  overflow: hidden;
`;

const ProductThumbnail = styled.img`
  width: 100%;
  height: 282px;
  transition: transform 0.3s;
  object-fit: cover;

  :hover {
    transform: scale(1.1);
  }
`;

const CardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  flex-grow: 1;
  padding: 0 12px;
`;

const InfoWrapper = styled.div`
  max-width: 70%;
`;

const ProductName = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textDefault};
  padding: 2px 0;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textDefault};
`;

function ProductCard({ productInfo: { id, thumbnailUrl, name, price } }) {
  return (
    <Link to={`/product-detail/${id}`}>
      <Container>
        <ImageWrapper>
          <ProductThumbnail src={thumbnailUrl ?? ""} />
        </ImageWrapper>
        <CardBottom>
          <InfoWrapper>
            <ProductName>{name ?? "%Error%"}</ProductName>
            <ProductPrice>{price.toLocaleString() ?? "%Error%"}원</ProductPrice>
          </InfoWrapper>
          <AddToCartButton />
        </CardBottom>
      </Container>
    </Link>
  );
}

export default ProductCard;
