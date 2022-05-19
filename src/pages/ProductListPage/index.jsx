import React from "react";
import styled from "styled-components";

import { useProductList } from "../../hooks/useProductList";
import { useCartItemList } from "./../../hooks/useCartItemList";

import Spinner from "../../components/common/Spinner";
import ProductCard from "./ProductCard";

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
    <GridList>
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
    </GridList>
  );
}

const GridList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;

  height: 100%;
  gap: 28px 12px;
`;

export default ProductListPage;
