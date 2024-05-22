import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartItemsState } from "@/stores/cartItems";

import * as S from "./styled";

interface CartLayoutProps {
  children: React.ReactNode;
}

const CartLayout = ({ children }: CartLayoutProps) => {
  const { pathname } = useLocation();
  const cartItemCount = useRecoilValue(cartItemsState).length;

  return (
    <S.Container>
      {pathname === "/" && <S.Title>장바구니</S.Title>}
      {cartItemCount !== 0 ? (
        children
      ) : (
        <div>장바구니에 담은 상품이 없습니다.</div>
      )}
    </S.Container>
  );
};

export default CartLayout;
