import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

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

import { API_SERVER, REQUEST_METHOD } from "../../constants";
import { useFetch } from "../../hooks/useFetch";

const REQUEST_PRODUCT_DETAIL_URL = (id) =>
  `${API_SERVER.BASE_URL}${API_SERVER.PATH.PRODUCTS}/${id}`;

function ProductDetailPage() {
  const { id: productId } = useParams();

  const {
    data: product,
    fetch: getProduct,
    isLoading: isProductLoading,
    errorMessage: productErrorMessage,
  } = useFetch(REQUEST_METHOD.GET, REQUEST_PRODUCT_DETAIL_URL(productId), []);

  const {
    cartItemList,
    getCartItemList,
    isLoading: isCartItemListLoading,
    errorMessage: cartItemErrorMessage,
    addCartItemQuantityWithSuccessMessage,
  } = useCartItemList();

  useEffect(() => {
    getProduct();
    getCartItemList();
  }, []);

  if (isProductLoading || isCartItemListLoading) return <Spinner />;
  if (productErrorMessage || cartItemErrorMessage)
    return (
      <div>😱 Error: {productErrorMessage || cartItemErrorMessage} 😱</div>
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
        onClick={() => {
          addCartItemQuantityWithSuccessMessage({
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
