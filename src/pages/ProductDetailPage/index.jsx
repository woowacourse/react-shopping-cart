import React from "react";
import { useParams } from "react-router-dom";

import { useProductDetail } from "../../hooks/useProductDetail";
import { useCartItemList } from "../../hooks/useCartItemList";

import Spinner from "../../components/common/Spinner";
import ProductDetailCard from "./ProductDetailCard";

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
    <ProductDetailCard
      product={{ ...product, quantity }}
      onClickAddToCartButton={() => {
        updateCartItemQuantityWithAlert({
          id: product.id,
          quantity: quantity + 1,
        });
      }}
    />
  );
}

export default ProductDetailPage;
