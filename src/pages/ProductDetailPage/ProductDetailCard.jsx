import React from "react";

import Button from "./../../components/common/Button";
import {
  StyledBottomSection,
  StyledContainer,
  StyledProductImg,
  StyledProductName,
  StyledProductPrice,
  StyledProductPriceText,
  StyledTopSection,
} from "./ProductDetailCard.styled";

function ProductDetailCard({
  product: { id, thumbnailUrl, name, price, quantity },
  onClickAddToCartButton,
}) {
  return (
    <StyledContainer>
      <StyledTopSection>
        <StyledProductImg src={thumbnailUrl} alt={name} />
        <StyledProductName>{name}</StyledProductName>
      </StyledTopSection>
      <StyledBottomSection>
        <StyledProductPriceText>금액</StyledProductPriceText>
        <StyledProductPrice>{price.toLocaleString()}원</StyledProductPrice>
      </StyledBottomSection>
      <AddToCartButton onClick={onClickAddToCartButton} />
    </StyledContainer>
  );
}

function AddToCartButton({ ...props }) {
  return (
    <Button
      height="60px"
      fontSize="1.25rem"
      fontWeight="700"
      color="white"
      bgColor="brown"
      {...props}
    >
      장바구니 담기
    </Button>
  );
}

export default ProductDetailCard;
