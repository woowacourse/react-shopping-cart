import React from "react";
import { useNavigate } from "react-router-dom";

import shoppingCartIconBlack from "../../../../asset/shopping-cart-icon-black.svg";

import IconButton from "../../../common/IconButton";
import {
  CardBottom,
  CardContainer,
  ImageWrapper,
  InfoWrapper,
  ProductName,
  ProductPrice,
  ProductThumbnail,
} from "./styled";

function ProductCard({ productInfo: { id, thumbnailUrl, name, price } }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <CardContainer onClick={onClick}>
      <ImageWrapper>
        <ProductThumbnail bgImage={thumbnailUrl ?? ""} />
      </ImageWrapper>
      <CardBottom>
        <InfoWrapper>
          <ProductName>{name ?? "%Error%"}</ProductName>
          <ProductPrice>{price?.toLocaleString() ?? "%Error%"}원</ProductPrice>
        </InfoWrapper>
        <IconButton
          title="장바구니 담기"
          onClick={(e) => {
            e.stopPropagation();
            alert("🛒아직입니다~~^^🛒");
          }}
          src={shoppingCartIconBlack}
          alt="장바구니 담기"
          width="30px"
        />
      </CardBottom>
    </CardContainer>
  );
}

export default ProductCard;
