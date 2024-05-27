import { ReactNode } from "react";
import { Wrapper } from "./style";

interface CartLayoutProps {
  children?: ReactNode;
}

const CartLayout = ({ children }: CartLayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default CartLayout;
