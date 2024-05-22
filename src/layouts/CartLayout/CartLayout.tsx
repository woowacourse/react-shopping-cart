import React from "react";
import { useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import { Wrapper, Title } from "./style";
import { cartItemsAtom } from "../../recoil/atoms/atoms";

interface CartLayoutProps {
  children: React.ReactNode;
}

const CartLayout = ({ children }: CartLayoutProps) => {
  const { pathname } = useLocation();
  const cartItemsLength = useRecoilValue(cartItemsAtom).length;

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
