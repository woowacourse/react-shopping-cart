import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCheckedItems,
  selectAllCartItems,
  selectCheckedCartItems,
  toggleAllChecked,
} from "../../store/modules/cartSlice";
import Button from "../@shared/Button/Button";
import CheckBox from "../@shared/CheckBox/CheckBox";
import CartListItem from "../CartListItem/CartListItem";
import * as S from "./CartList.styled";

const CartList = () => {
  const dispatch = useDispatch();

  const cart = useSelector(selectAllCartItems);
  const checkedItems = useSelector(selectCheckedCartItems);

  const handleCheckBoxChange = (event) => {
    const { checked } = event.target;
    dispatch(toggleAllChecked({ checked }));
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
            checked={checkedItems.length === cart.length}
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
      <S.Title>든든배송 상품 ({cart.length}개)</S.Title>
      <S.List aria-label="cart-item-list">
        {cart.map((item) => (
          <CartListItem key={item.cartId} item={item} />
        ))}
      </S.List>
    </S.CartList>
  );
};

export default CartList;
