import React from "react";

import { useProductList } from "../../hooks/useProductList";
import { useCartItemList } from "./../../hooks/useCartItemList";

import Spinner from "../../components/common/Spinner";
import ProductCard from "./ProductCard";
import { StyledGridList } from "./index.styled";

function ProductListPage() {
  const {
    productList,
    isLoading: isProductListLoading,
    errorMessage: productListErrorMessage,
  } = useProductList();

  const {
    cartItemList,
    isLoading: isCartItemListLoading,
    errorMessage: cartItemErrorMessage,
    updateCartItemQuantityWithAlert,
  } = useCartItemList();

  const ProductListWithQuantity = productList?.map((product) => {
    const cartItemListIndex = cartItemList?.findIndex(
      (cartItem) => cartItem.id === product.id
    );
    const quantity =
      cartItemListIndex === -1 ? 0 : cartItemList[cartItemListIndex].quantity;
    return { ...product, quantity };
  });

  if (isProductListLoading || isCartItemListLoading) return <Spinner />;
  if (productListErrorMessage || cartItemErrorMessage)
    return (
      <div>😱 Error: {productListErrorMessage || cartItemErrorMessage} 😱</div>
    );

  if (productList?.length === 0) return <h2>😱 텅 비었어요~~ 😱</h2>;

  return (
    <StyledGridList>
      {ProductListWithQuantity.map((product) => (
        <ProductCard
          key={product.id}
          product={{ ...product }}
          onClickAddToCartButton={() => {
            updateCartItemQuantityWithAlert({
              id: product.id,
              quantity: product.quantity + 1,
            });
          }}
        />
      ))}
    </StyledGridList>
  );
}

export default ProductListPage;
