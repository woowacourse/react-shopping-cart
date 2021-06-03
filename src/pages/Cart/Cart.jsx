import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { selectCartIds, selectCartStatus } from "../../store/modules/cartSlice";
import STATUS from "../../constants/status";
import PageTitle from "../../components/@mixins/PageTitle/PageTitle";
import CartList from "../../components/CartList/CartList";
import CartEmptyList from "../../components/CartEmptyList/CartEmptyList";
import CartResultBox from "../../components/CartResultBox/CartResultBox";
import * as S from "./Cart.styled";

const Cart = () => {
  const cartIds = useSelector(selectCartIds, shallowEqual);
  const cartStatus = useSelector(selectCartStatus);

  return (
    <S.Cart>
      <PageTitle>장바구니</PageTitle>
      {cartStatus === STATUS.SUCCEEDED && cartIds.length === 0 ? (
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
