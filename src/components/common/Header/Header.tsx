import { Link } from "react-router-dom";
import { ReactComponent as ShoppingCartIcon } from "../../../assets/icon/logo.svg";
import Styled from "./HeaderStyled";

interface HeaderProps {
  children: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <Styled.Container>
      <Link to="/">
        <Styled.Logo>
          <ShoppingCartIcon />
          <Styled.Title>SHOP</Styled.Title>
        </Styled.Logo>
      </Link>
      <>{children}</>
    </Styled.Container>
  );
};

export default Header;
