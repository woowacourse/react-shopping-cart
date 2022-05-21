import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import routes from "../../routes";
import { HeaderContainer, HeaderTitle, HeaderMenu } from "./styles";

function Header() {
  return (
    <HeaderContainer>
      <HeaderTitle to={"/"}>
        <img alt="Logo" src={Logo} />
        <h1>WOOWA SHOP</h1>
      </HeaderTitle>
      <HeaderMenu>
        <Link to={routes.cart}>장바구니</Link>
        <Link to={routes.orderList}>주문목록</Link>
      </HeaderMenu>
    </HeaderContainer>
  );
}

export default Header;
