import * as Styled from "./CouponList.style";

import { PropsWithChildren } from "react";

function CouponList({ children }: PropsWithChildren) {
  return <Styled.UlContainer>{children}</Styled.UlContainer>;
}

export default CouponList;
