import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  useThunk(getCartList);

  const [checkList, setCheckList] = useState([]);

  const handleChangeAllCheckbox = () => {
    if (checkList.length === 0) {
      setCheckList(cartList.map((cartItem) => cartItem.id));
      return;
    }
    setCheckList([]);
  };

  const handleDeleteAllItem = () => {};

  const [totalPrice, totalCount] = cartList.reduce(
    (acc, { id, price, count }) => {
      if (checkList.includes(id)) {
        acc[0] += price * count;
        acc[1] += count;
      }
      return acc;
    },
    [0, 0]
  );

  const renderListContent = () => {
    if (isLoading) return <Spinner />;
    if (errorMessage) return <ErrorPage>에러: ${errorMessage} </ErrorPage>;
    return (
      <ProductCartList
        cartList={cartList}
        checkList={checkList}
        handleChangeAllCheckbox={handleChangeAllCheckbox}
        handleDeleteAllItem={handleDeleteAllItem}
        setCheckList={setCheckList}
      />
    );
  };

  useEffect(() => {
    setCheckList(cartList.map((cartItem) => cartItem.id));
  }, [cartList]);

  return (
    <CartPageContainer>
      <CartPageHeader>장바구니</CartPageHeader>
      <CartPageList>{renderListContent()}</CartPageList>
      <CartPagePayment>
        <PaymentAmount
          position="sticky"
          totalPrice={totalPrice}
          totalCount={totalCount}
        />
      </CartPagePayment>
    </CartPageContainer>
  );
}

export default ProductCartPage;
