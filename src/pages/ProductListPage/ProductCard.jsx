import React from "react";
import { Link } from "react-router-dom";

import IconButton from "../../components/common/IconButton";
import * as S from "./ProductCard.styled";

import { PATH } from "../../constants";
import shoppingCartIconBlack from "../../asset/shopping-cart-icon-black.svg";

function ProductCard({
  product: { id, thumbnailUrl, name, price, quantity },
  onClickAddToCartButton,
}) {
  return (
    <Link to={PATH.PRODUCT_DETAIL_WITH_ID(id)}>
      <S.ProductCardContainer>
        <S.ProductImageWrapper>
          <S.ProductThumbnail src={thumbnailUrl ?? ""} alt={name} />
        </S.ProductImageWrapper>
        <S.ProductCardBottom>
          <S.ProductTextInfoContainer>
            <S.ProductName>{name ?? "%Error%"}</S.ProductName>
            <S.ProductPrice>
              {price.toLocaleString() ?? "%Error%"}원
            </S.ProductPrice>
          </S.ProductTextInfoContainer>
          <AddToCartButton
            onClick={(e) => {
              e.preventDefault();
              onClickAddToCartButton();
            }}
          />
        </S.ProductCardBottom>
      </S.ProductCardContainer>
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
