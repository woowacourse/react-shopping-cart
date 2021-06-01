import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectCartIds } from "../../store/modules/cartSlice";
import PageTitle from "../../components/@mixins/PageTitle/PageTitle";
import CartList from "../../components/CartList/CartList";
import CartEmptyList from "../../components/CartEmptyList/CartEmptyList";
import CartResultBox from "../../components/CartResultBox/CartResultBox";
import * as S from "./Cart.styled";

const Cart = () => {
  const cartIds = useSelector(selectCartIds, shallowEqual);

  return (
    <S.Cart>
      <PageTitle>장바구니</PageTitle>
      {cartIds.length === 0 ? (
        <CartEmptyList />
      ) : (
        <S.CartMain>
          <CartList cartIds={cartIds} />
          <CartResultBox />
        </S.CartMain>
      )}
    </S.Cart>
  );
};

export default Cart;
