import * as Styled from "./OrderConfirmationList.style";

import { PropsWithChildren } from "react";

function OrderConfirmationList({ children }: PropsWithChildren) {
  return (
    <Styled.Container>
      <Styled.UlContainer>{children}</Styled.UlContainer>
    </Styled.Container>
  );
}

export default OrderConfirmationList;
