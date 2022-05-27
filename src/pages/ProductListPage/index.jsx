import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCartItemList,
  postCartItemByProductList,
} from "../../store/cartReducer";

import { useFetch } from "../../hooks/useFetch";

import Spinner from "../../components/common/Spinner";
import ProductCard from "./ProductCard";
import * as S from "./index.styled";

import {
  ACTION_SUCCESS_MESSAGE,
  API_SERVER,
  REQUEST_METHOD,
} from "../../constants";

const REQUEST_PRODUCT_LIST_URL = `${API_SERVER.BASE_URL}${API_SERVER.PATH.PRODUCTS}`;

function ProductListPage() {
  const dispatch = useDispatch();

  const {
    data: productList,
    fetch: getProductList,
    isLoading: isProductListLoading,
    errorMessage: productListErrorMessage,
  } = useFetch(REQUEST_METHOD.GET, REQUEST_PRODUCT_LIST_URL, []);

  const {
    data: cartItemList,
    loading: isCartItemListLoading,
    errorMessage: cartItemErrorMessage,
  } = useSelector((state) => state.cartReducer);

  const handleClickAddToCartButton = (id, quantity) => () => {
    dispatch(
      postCartItemByProductList(
        [{ id, quantity }],
        ACTION_SUCCESS_MESSAGE.POST_CART_ITEM_SUCCESS_WITH_QUANTITY(quantity)
      )
    );
  };

  useEffect(() => {
    getProductList();
    dispatch(getCartItemList());
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
    <S.GridList>
      {ProductListWithQuantity.map((product) => (
        <ProductCard
          key={product.id}
          product={{ ...product }}
          onClickAddToCartButton={handleClickAddToCartButton(
            product.id,
            product.quantity + 1
          )}
        />
      ))}
    </S.GridList>
  );
}

export default ProductListPage;
