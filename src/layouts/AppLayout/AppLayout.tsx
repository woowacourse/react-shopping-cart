import React from "react";
import { useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import { Wrapper, Title } from "./style";
import { cartSummaryState } from "../../recoil/selectors/selectors";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { pathname } = useLocation();
  const { cartItemTotalQuantity } = useRecoilValue(cartSummaryState);

  return (
    <Wrapper>
      {pathname === "/" && <Title>장바구니</Title>}
      {cartItemTotalQuantity !== 0 ? (
        children
      ) : (
        <div>장바구니에 담은 상품이 없습니다.</div>
      )}
    </Wrapper>
  );
};

export default AppLayout;
