import React from "react";
import { useNavigate } from "react-router-dom";

import shoppingCartIconBlack from "asset/shopping-cart-icon-black.svg";
import { BASE_SERVER_URL, ROUTES, SERVER_PATH } from "constants";

import IconButton from "components/common/Button/IconButton";
import {
  CardBottom,
  CardContainer,
  ImageWrapper,
  InfoWrapper,
  ProductName,
  ProductPrice,
  ProductThumbnail,
} from "./styled";

function ProductCard({ product: { id, thumbnailUrl, name, price } }) {
  const navigate = useNavigate();

  const handleClickCardItem = () => {
    navigate(`${ROUTES.PRODUCT_DETAIL}/${id}`);
  };

  const handleClickCartIconButton = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `${BASE_SERVER_URL}${SERVER_PATH.CART_LIST}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, count: 1 }),
        }
      );

      if (!response.ok) {
        throw new Error("response not ok");
      }

      const { isAlreadyExists } = await response.json();
      if (isAlreadyExists) {
        alert("이미 장바구니에 담은 상품입니다.");
        return;
      }
    } catch (error) {
      alert(`장바구니 담기에 실패했습니다.`);
      return;
    }
    alert("장바구니에 담았습니다.");
  };

  return (
    <CardContainer onClick={handleClickCardItem}>
      <ImageWrapper>
        <ProductThumbnail bgImage={thumbnailUrl ?? ""} alt={name} />
      </ImageWrapper>
      <CardBottom>
        <InfoWrapper>
          <ProductName>{name ?? "%Error%"}</ProductName>
          <ProductPrice>{price?.toLocaleString() ?? "%Error%"}원</ProductPrice>
        </InfoWrapper>
        <IconButton
          onClick={handleClickCartIconButton}
          src={shoppingCartIconBlack}
          alt="장바구니 담기 버튼"
          width="30px"
        />
      </CardBottom>
    </CardContainer>
  );
}

export default ProductCard;
