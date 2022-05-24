import React from "react";
import { Link } from "react-router-dom";

import IconButton from "../../components/common/IconButton";
import {
  StyledProductCardBottom,
  StyledProductCardContainer,
  StyledProductImageWrapper,
  StyledProductName,
  StyledProductPrice,
  StyledProductTextInfoContainer,
  StyledProductThumbnail,
} from "./ProductCard.styled";

import { PATH } from "../../constants";
import shoppingCartIconBlack from "../../asset/shopping-cart-icon-black.svg";

function ProductCard({
  product: { id, thumbnailUrl, name, price, quantity },
  onClickAddToCartButton,
}) {
  return (
    <Link to={PATH.PRODUCT_DETAIL_WITH_ID(id)}>
      <StyledProductCardContainer>
        <StyledProductImageWrapper>
          <StyledProductThumbnail src={thumbnailUrl ?? ""} alt={name} />
        </StyledProductImageWrapper>
        <StyledProductCardBottom>
          <StyledProductTextInfoContainer>
            <StyledProductName>{name ?? "%Error%"}</StyledProductName>
            <StyledProductPrice>
              {price.toLocaleString() ?? "%Error%"}원
            </StyledProductPrice>
          </StyledProductTextInfoContainer>
          <AddToCartButton
            onClick={(e) => {
              e.preventDefault();
              onClickAddToCartButton();
            }}
          />
        </StyledProductCardBottom>
      </StyledProductCardContainer>
    </Link>
  );
}

function AddToCartButton({ ...props }) {
  return (
    <IconButton
      title="장바구니 담기"
      iconImgSrc={shoppingCartIconBlack}
      iconImgAlt="장바구니 담기"
      width="30px"
      {...props}
    />
  );
}

export default ProductCard;
