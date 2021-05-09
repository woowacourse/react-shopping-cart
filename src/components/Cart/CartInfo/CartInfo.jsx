import React from "react";
import Button from "../../@shared/Button/Button";
import CheckBox from "../../@shared/CheckBox/CheckBox";
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
    <div>상품목록</div>
  </S.CartInfo>
);

export default CartInfo;
