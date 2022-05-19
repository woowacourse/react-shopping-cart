import React from "react";
import { useSelector } from "react-redux";
import { LOCAL_STORAGE_CART_LIST_KEY } from "../../../constants";

import { useThunk } from "../../../hooks/useThunk";
import { getCartList } from "../../../reducers/cartList";

import Spinner from "../../common/Spinner";
import ErrorPage from "../ErrorPage";
import PaymentAmount from "./PaymentAmount";
import ProductCartList from "./ProductCartList";
import {
  CartPageContainer,
  CartPageHeader,
  CartPageList,
  CartPagePayment,
} from "./styled";

function ProductCartPage() {
  const {
    data: cartList,
    isLoading,
    errorMessage,
  } = useSelector((state) => state.cartList);

  let savedCartList = [];
  try {
    savedCartList =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART_LIST_KEY)) || [];
  } catch (error) {
    savedCartList = [];
    alert("장바구니 목록을 가져오는 데 실패했습니다.");
    localStorage.setItem(LOCAL_STORAGE_CART_LIST_KEY, JSON.stringify([]));
  }
  const idList = savedCartList.map(({ id }) => id).join(",");
  useThunk(getCartList(idList));

  const renderListContent = () => {
    if (isLoading) return <Spinner />;
    if (errorMessage) return <ErrorPage>에러: ${errorMessage} </ErrorPage>;
    return <ProductCartList cartList={cartList} />;
  };

  return (
    <CartPageContainer>
      <CartPageHeader>장바구니</CartPageHeader>
      <CartPageList>{renderListContent()}</CartPageList>
      <CartPagePayment>
        <PaymentAmount position="sticky" />
      </CartPagePayment>
    </CartPageContainer>
  );
}

export default ProductCartPage;
