import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { postCartItem } from "../../store/actions";

import AddToCartButton from "./AddToCartButton";

import { PATH } from "../../constants";

function ProductCard({ product: { id, thumbnailUrl, name, price } }) {
  const dispatch = useDispatch();

  return (
    <Link to={PATH.PRODUCT_DETAIL_WITH_ID(id)}>
      <Container>
        <ImageWrapper>
          <ProductThumbnail src={thumbnailUrl ?? ""} alt={name} />
        </ImageWrapper>
        <CardBottom>
          <TextInfoContainer>
            <ProductName>{name ?? "%Error%"}</ProductName>
            <ProductPrice>{price.toLocaleString() ?? "%Error%"}원</ProductPrice>
          </TextInfoContainer>
          <AddToCartButton
            onClick={(e) => {
              e.preventDefault();
              dispatch(postCartItem([id]));
            }}
          />
        </CardBottom>
      </Container>
    </Link>
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

const ProductThumbnail = styled.img`
  width: 100%;
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
  color: ${({ theme }) => theme.color.grey_700};
  padding: 2px 0;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.color.grey_700};
`;

export default ProductCard;
