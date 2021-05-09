import React from "react";
import Button from "../../@shared/Button/Button";
import CheckBox from "../../@shared/CheckBox/CheckBox";
import CartItem from "../CartItem/CartItem";
import * as S from "./CartInfo.styled";

const CartInfo = () => (
  <S.CartInfo>
    <S.Menu>
      <S.CheckAllLabel htmlFor="checkAll">
        <CheckBox id="checkAll" name="checkAll" label="선택해제" />
        선택해제
      </S.CheckAllLabel>
      <S.RemoveChecked>
        <Button type="secondary">상품삭제</Button>
      </S.RemoveChecked>
    </S.Menu>
    <S.Title>든든배송 상품 (3개)</S.Title>
    <div>
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
    </div>
  </S.CartInfo>
);

export default CartInfo;
