import { Wrapper } from "./style";
import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Header;
