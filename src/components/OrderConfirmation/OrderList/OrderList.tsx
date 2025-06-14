import * as Styled from "./OrderList.style";

import { PropsWithChildren } from "react";

function OrderList({ children }: PropsWithChildren) {
  return <Styled.UlContainer>{children}</Styled.UlContainer>;
}

export default OrderList;
