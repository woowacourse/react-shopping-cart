import React from "react";
import { useParams } from "react-router-dom";

import { useProductDetail } from "../../hooks/useProductDetail";
import { useCartItemList } from "../../hooks/useCartItemList";

import Spinner from "../../components/common/Spinner";
import Button from "../../components/common/Button";
import {
  StyledBottomSection,
  StyledContainer,
  StyledProductImg,
  StyledProductName,
  StyledProductPrice,
  StyledProductPriceText,
  StyledTopSection,
} from "./index.styled";

function ProductDetailPage() {
  const { id: productId } = useParams();

  const {
    product,
    isLoading: isProductDetailLoading,
    errorMessage: productDetailErrorMEssage,
  } = useProductDetail(productId);

  const {
    cartItemList,
    isLoading: isCartItemListLoading,
    errorMessage: cartItemErrorMessage,
    updateCartItemQuantityWithAlert,
  } = useCartItemList();

  if (isProductDetailLoading || isCartItemListLoading) return <Spinner />;
  if (productDetailErrorMEssage || cartItemErrorMessage)
    return (
      <div>
        😱 Error: {productDetailErrorMEssage || cartItemErrorMessage} 😱
      </div>
    );

  const cartItemListIndex = cartItemList?.findIndex(
    (cartItem) => cartItem.id === product.id
  );
  const quantity =
    cartItemListIndex === -1 ? 0 : cartItemList[cartItemListIndex].quantity;

  return (
    <StyledContainer>
      <StyledTopSection>
        <StyledProductImg src={product.thumbnailUrl} alt={product.name} />
        <StyledProductName>{product.name}</StyledProductName>
      </StyledTopSection>
      <StyledBottomSection>
        <StyledProductPriceText>금액</StyledProductPriceText>
        <StyledProductPrice>
          {product.price.toLocaleString()}원
        </StyledProductPrice>
      </StyledBottomSection>
      <AddToCartButton
        onClickAddToCartButton={() => {
          updateCartItemQuantityWithAlert({
            id: product.id,
            quantity: quantity + 1,
          });
        }}
      />
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

export default ProductDetailPage;
