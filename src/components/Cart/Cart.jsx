import React from "react";
import PageTitle from "../@mixins/PageTitle/PageTitle";
import ResultBox from "../@mixins/ResultBox/ResultBox";
import CartInfo from "./CartInfo/CartInfo";
import * as S from "./Cart.styled";

const Cart = () => (
  <S.Cart>
    <PageTitle>장바구니</PageTitle>
    <S.CartMain>
      <CartInfo />
      <ResultBox />
    </S.CartMain>
  </S.Cart>
);

export default Cart;
