import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import * as Styled from "./styles";

function Header() {
  return (
    <Styled.HeaderWrapper>
      <Styled.HeaderTitle to={"/"}>
        <img alt="Logo" src={Logo} />
        <h1>WOOWA SHOP</h1>
      </Styled.HeaderTitle>
      <Styled.HeaderMenu>
        <Link to={"/cart"}>장바구니</Link>
        <Link to={"/order-list"}>주문목록</Link>
      </Styled.HeaderMenu>
    </Styled.HeaderWrapper>
  );
}

export default Header;
