import React from "react";
import * as S from "./index.styles";

const CartOrder = () => {
  return (
    <S.CartOrderContainer>
      <S.CartOrderTitle>결제예상금액</S.CartOrderTitle>
      <S.PriceContainer>
        <S.Price>결제예상금액</S.Price>
        <S.Price>21,700원</S.Price>
      </S.PriceContainer>
      <S.OrderButton>주문하기(2개)</S.OrderButton>
    </S.CartOrderContainer>
  );
};

export default CartOrder;
