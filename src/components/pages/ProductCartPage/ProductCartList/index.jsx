import React from "react";

import CheckBox from "components/common/CheckBox";
import ProductCartItem from "../ProductCartItem";
import {
  CartListControlContainer,
  CartListCount,
  DeleteCartButton,
} from "./styled";

function ProductCartList({
  cartList,
  checkList,
  handleChangeAllCheckbox,
  handleDeleteAllItem,
  handleClickIncreaseButton,
  handleClickDecreaseButton,
  handleClickDeleteItemButton,
  handleChangeCheckbox,
}) {
  return (
    <>
      <CartListControlContainer>
        <CheckBox
          isChecked={checkList.length !== 0}
          handleChangeCheckbox={handleChangeAllCheckbox}
        >
          선택해제
        </CheckBox>
        <DeleteCartButton onClick={handleDeleteAllItem}>
          상품 삭제
        </DeleteCartButton>
      </CartListControlContainer>
      <CartListCount>
        든든배송 상품 ({cartList?.length ?? "%ERROR%"}개)
      </CartListCount>
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
}

export default ProductCartList;
