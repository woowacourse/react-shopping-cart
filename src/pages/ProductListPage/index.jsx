import React, { useEffect } from "react";

import { useCartItemList } from "./../../hooks/useCartItemList";
import { useFetch } from "../../hooks/useFetch";

import Spinner from "../../components/common/Spinner";
import ProductCard from "./ProductCard";
import { StyledGridList } from "./index.styled";

import { API_SERVER, REQUEST_METHOD } from "../../constants";

const REQUEST_PRODUCT_LIST_URL = `${API_SERVER.BASE_URL}${API_SERVER.PATH.PRODUCTS}`;

function ProductListPage() {
  const {
    fetch: getProductList,
    data: productList,
    isLoading: isProductListLoading,
    errorMessage: productListErrorMessage,
  } = useFetch(REQUEST_METHOD.GET, REQUEST_PRODUCT_LIST_URL, []);

  const {
    cartItemList,
    isLoading: isCartItemListLoading,
    errorMessage: cartItemErrorMessage,
    updateCartItemQuantityWithSuccessMessage,
  } = useCartItemList();

  useEffect(() => {
    getProductList();
  }, []);

  if (isProductListLoading || isCartItemListLoading) return <Spinner />;
  if (productListErrorMessage || cartItemErrorMessage)
    return (
      <div>😱 Error: {productListErrorMessage || cartItemErrorMessage} 😱</div>
    );

  if (productList?.length === 0) return <h2>😱 텅 비었어요~~ 😱</h2>;

  const ProductListWithQuantity = productList?.map((product) => {
    const cartItemListIndex = cartItemList?.findIndex(
      (cartItem) => cartItem.id === product.id
    );
    const quantity =
      cartItemListIndex === -1 ? 0 : cartItemList[cartItemListIndex].quantity;
    return { ...product, quantity };
  });

  return (
    <StyledGridList>
      {ProductListWithQuantity.map((product) => (
        <ProductCard
          key={product.id}
          product={{ ...product }}
          onClickAddToCartButton={() => {
            updateCartItemQuantityWithSuccessMessage({
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
