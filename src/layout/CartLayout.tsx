import { PropsWithChildren, ReactNode } from "react";

import * as Styled from "./CartLayout.style";

interface CartLayoutProps extends PropsWithChildren {
  footer?: ReactNode;
}

function CartLayout({ children, footer }: CartLayoutProps) {
  return (
    <Styled.Container>
      <Styled.Wrapper>{children}</Styled.Wrapper>
      {footer && <div className="fixed-footer">{footer}</div>}
    </Styled.Container>
  );
}

export default CartLayout;
