import { CartTitleStyle } from "./CartTitle.style";
import { PropsWithChildren } from "react";

interface CartTitle extends PropsWithChildren {
  description?: string;
}

const CartTitle = ({ children }: CartTitle) => {
  return (
    <div>
      <h1 css={CartTitleStyle}>{children}</h1>
    </div>
  );
};

export default CartTitle;
