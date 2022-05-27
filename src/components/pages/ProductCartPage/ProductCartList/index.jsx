import React from "react";

import { useStore } from "hooks/useStore";
import { deleteCartList, updateCartCount } from "reducers/cartList";

import CheckBox from "components/common/CheckBox";
import ProductCartItem from "../ProductCartItem";
import {
  CartListControlContainer,
  CartListCount,
  DeleteCartButton,
} from "./styled";
import Spinner from "components/common/Spinner";
import ErrorPage from "components/pages/ErrorPage";

function ProductCartList({ checkList, setCheckList }) {
  const {
    data: cartList,
    isLoading,
    errorMessage,
    dispatch,
  } = useStore("cartList");

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

  const renderListContent = () => {
    if (isLoading) return <Spinner />;
    if (errorMessage) return <ErrorPage>에러: ${errorMessage} </ErrorPage>;
    if (cartList.length === 0) return <div>담은 상품이 없습니다.</div>;
    return (
      <>
        {cartList.map((cartItem) => (
          <ProductCartItem
            product={cartItem}
            checkList={checkList}
            handleClickIncreaseButton={handleClickIncreaseButton}
            handleClickDecreaseButton={handleClickDecreaseButton}
            handleClickDeleteItemButton={handleClickDeleteItemButton}
            handleChangeCheckbox={handleChangeCheckbox}
            key={cartItem.id}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <CartListControlContainer>
        <CheckBox
          isChecked={checkList.length !== 0}
          handleChangeCheckbox={handleChangeAllCheckbox}
          disabled={cartList.length === 0}
        >
          선택해제
        </CheckBox>
        <DeleteCartButton
          onClick={handleDeleteAllItem}
          disabled={cartList.length === 0}
        >
          상품 삭제
        </DeleteCartButton>
      </CartListControlContainer>
      <CartListCount>
        든든배송 상품 ({cartList?.length ?? "%ERROR%"}개)
      </CartListCount>
      {renderListContent()}
    </>
  );
}

export default ProductCartList;
