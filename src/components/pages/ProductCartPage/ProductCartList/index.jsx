import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCartList } from "../../../../reducers/cartList";

import CheckBox from "../../../common/CheckBox";
import ProductCartItem from "../ProductCartItem";
import {
  CartListControlContainer,
  CartListCount,
  DeleteCartButton,
} from "./styled";

function ProductCartList({ cartList }) {
  const [isAllChecked, setIsAllChecked] = useState(true);
  const dispatch = useDispatch();

  const handleChangeCheckbox = () => {
    setIsAllChecked((prev) => !prev);
  };

  const handleDeleteAllItem = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(deleteCartList());
    }
  };

  return (
    <>
      <CartListControlContainer>
        <CheckBox
          isChecked={isAllChecked}
          handleChangeCheckbox={handleChangeCheckbox}
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
          amount={cartItem.count}
          key={cartItem.id}
        />
      ))}
    </>
  );
}

export default ProductCartList;
