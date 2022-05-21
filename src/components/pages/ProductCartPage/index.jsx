import React, { useEffect, useState } from "react";

import { useStore } from "hooks/useStore";
import {
  deleteCartList,
  getCartList,
  updateCartCount,
} from "reducers/cartList";

import Spinner from "components/common/Spinner";
import ErrorPage from "components/pages/ErrorPage";
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
    dispatch,
  } = useStore("cartList");

  console.log(cartList);
  const [checkList, setCheckList] = useState([]);

  const handleChangeAllCheckbox = () => {
    if (checkList.length === 0) {
      setCheckList(cartList.map((cartItem) => cartItem.id));
      return;
    }
    setCheckList([]);
  };

  const handleDeleteAllItem = () => {
    checkList.forEach((carItemId) => {
      dispatch(deleteCartList(carItemId));
    });
    setCheckList([]);
  };

  const handleClickIncreaseButton = (id) => () => {
    if (!checkList.includes(id)) setCheckList((prev) => [...prev, id]);
    dispatch(updateCartCount(id, "increase"));
  };

  const handleClickDecreaseButton = (id, count) => () => {
    if (count <= 1) return;
    if (!checkList.includes(id)) setCheckList((prev) => [...prev, id]);
    dispatch(updateCartCount(id, "decrease"));
  };

  const handleClickDeleteItemButton = (id) => () => {
    dispatch(deleteCartList(id));
    setCheckList((prev) => prev.filter((cartItemId) => cartItemId !== id));
  };

  const handleChangeCheckbox = (id) => () => {
    if (checkList.includes(id)) {
      setCheckList((prev) => prev.filter((cartItemId) => cartItemId !== id));
      return;
    }
    setCheckList((prev) => [...prev, id]);
  };

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
        handleClickIncreaseButton={handleClickIncreaseButton}
        handleClickDecreaseButton={handleClickDecreaseButton}
        handleClickDeleteItemButton={handleClickDeleteItemButton}
        handleChangeCheckbox={handleChangeCheckbox}
      />
    );
  };

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  useEffect(() => {
    if (checkList.length === 0)
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
