/* eslint-disable react/prop-types */
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  deleteCheckedItems,
  selectCheckedCartIds,
  toggleAllChecked,
} from "../../store/modules/cartSlice";
import Button from "../@shared/Button/Button";
import CheckBox from "../@shared/CheckBox/CheckBox";
import CartListItem from "../CartListItem/CartListItem";
import * as S from "./CartList.styled";

const CartList = ({ cartIds }) => {
  const dispatch = useDispatch();

  const checkedCartIds = useSelector(selectCheckedCartIds, shallowEqual);

  const isCheckedAll = cartIds.length === checkedCartIds.length;

  const handleCheckBoxChange = () => {
    dispatch(toggleAllChecked({ checked: !isCheckedAll }));
  };

  const handleRemoveCheckedClick = () => {
    if (!window.confirm("선택한 상품들을 장바구니에서 제거하시겠습니까?"))
      return;

    dispatch(deleteCheckedItems());
  };

  return (
    <S.CartList>
      <S.Menu>
        <S.CheckAllLabel>
          <CheckBox
            name="check-all"
            checked={isCheckedAll}
            onChange={handleCheckBoxChange}
          />
          전체선택
        </S.CheckAllLabel>
        <S.RemoveChecked>
          <Button type="secondary" onClick={handleRemoveCheckedClick}>
            상품삭제
          </Button>
        </S.RemoveChecked>
      </S.Menu>
      <S.Title>든든배송 상품 ({cartIds.length}개)</S.Title>
      <S.List aria-label="cart-item-list">
        {cartIds.map((cartId) => (
          <CartListItem key={cartId} cartId={cartId} />
        ))}
      </S.List>
    </S.CartList>
  );
};

export default CartList;
