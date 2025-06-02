import { PropsWithChildren } from "react";
import CartHeader from "../components/Cart/CartHeader/CartHeader";
import * as Styled from "./CartLayout.style";

function CartLayout({ children }: PropsWithChildren) {
  return (
    <Styled.Container>
      <Styled.Wrapper>
        <CartHeader />
        {children}
      </Styled.Wrapper>
    </Styled.Container>
  );
}

export default CartLayout;
