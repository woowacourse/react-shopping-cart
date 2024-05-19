import { Wrapper } from "./style";

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Header;
