import React from "react";
import { useRecoilValue } from "recoil";
import { cartItemsState } from "../../recoil/selectors/selectors";
import { useLocation } from "react-router-dom";
import { Wrapper, Title } from "./style";

interface CartLayoutProps {
  children: React.ReactNode;
}

const CartLayout = ({ children }: CartLayoutProps) => {
  const { pathname } = useLocation();
  const cartItemsLength = useRecoilValue(cartItemsState).length;

  return (
    <Wrapper>
      {pathname === "/" && <Title>장바구니</Title>}
      {cartItemsLength !== 0 ? (
        children
      ) : (
        <div>장바구니에 담은 상품이 없습니다.</div>
      )}
    </Wrapper>
  );
};

export default CartLayout;
