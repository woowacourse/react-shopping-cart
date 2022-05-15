import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import AddToCartButton from "./AddToCartButton";

import { PATH } from "../../constants";

function ProductCard({ product: { id, thumbnailUrl, name, price } }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(PATH.PRODUCT_DETAIL_WITH_ID(id));
  };

  return (
    <Container onClick={onClick}>
      <ImageWrapper>
        <ProductThumbnail bgImage={thumbnailUrl ?? ""} />
      </ImageWrapper>
      <CardBottom>
        <TextInfoContainer>
          <ProductName>{name ?? "%Error%"}</ProductName>
          <ProductPrice>{price.toLocaleString() ?? "%Error%"}원</ProductPrice>
        </TextInfoContainer>
        <AddToCartButton />
      </CardBottom>
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  flex-direction: column;
  width: 280px;
  height: 360px;
  border: 1px solid #ddd;

  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 278px;

  overflow: hidden;
`;

const ProductThumbnail = styled.div`
  width: 100%;
  height: 100%;

  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(${({ bgImage }) => bgImage});
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

const TextInfoContainer = styled.div`
  max-width: 70%;
`;

const ProductName = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.darkGrey};
  padding: 2px 0;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.color.darkGrey};
`;

export default ProductCard;
