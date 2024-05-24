import { PropsWithChildren } from "react";
import { CartItemTypesCountStyle } from "./CartDescription.style";

const CartDescription = ({ children }: PropsWithChildren) => {
  return <div css={CartItemTypesCountStyle}>{children}</div>;
};

export default CartDescription;
