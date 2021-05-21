import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeChecked,
  toggleAllChecked,
} from "../../../store/modules/cartSlice";
import Button from "../../@shared/Button/Button";
import CheckBox from "../../@shared/CheckBox/CheckBox";
import CartItem from "./CartItem/CartItem";
import * as S from "./CartInfo.styled";

const isAllItemChecked = (cart) => {
  const cartItemList = Object.values(cart);

  if (cartItemList.length === 0) return false;

  const unchecked = cartItemList.find(({ checked }) => !checked);

  return !unchecked;
};

const CartInfo = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleCheckBoxChange = (event) => {
    const { checked } = event.target;
    dispatch(toggleAllChecked({ checked }));
  };

  const handleRemoveCheckedClick = () => {
    if (!window.confirm("선택한 상품들을 장바구니에서 제거하시겠습니까?"))
      return;

    dispatch(removeChecked());
  };

  return (
    <S.CartInfo>
      <S.Menu>
        <S.CheckAllLabel>
          <CheckBox
            name="check-all"
            checked={isAllItemChecked(cart)}
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
      <S.Title>든든배송 상품 ({Object.keys(cart).length}개)</S.Title>
      <S.List aria-label="cart-item-list">
        {Object.entries(cart).map(([id, item]) => (
          <CartItem key={id} item={item} />
        ))}
      </S.List>
    </S.CartInfo>
  );
};

export default CartInfo;
