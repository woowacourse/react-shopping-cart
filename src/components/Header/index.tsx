import { useNavigate } from "react-router-dom";

import Logo from "../../assets/Logo.png";
import * as Styled from "./styles";

function Header() {
  const navigate = useNavigate();

  return (
    <Styled.HeaderWrapper>
      <Styled.HeaderTitle onClick={() => navigate("/")}>
        <img alt="Logo" src={Logo} />
        <div>WOOWA SHOP</div>
      </Styled.HeaderTitle>
      <Styled.HeaderMenu>
        <div onClick={() => navigate("/cart")}>장바구니</div>
        <div onClick={() => navigate("/order-list")}>주문목록</div>
      </Styled.HeaderMenu>
    </Styled.HeaderWrapper>
  );
}

export default Header;
