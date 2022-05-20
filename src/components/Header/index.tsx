import { useNavigate } from "react-router-dom";

import * as S from "./styles";

import Logo from "../../assets/Logo.png";

function Header() {
  const navigate = useNavigate();

  return (
    <S.HeaderWrapper>
      <S.HeaderTitle onClick={() => navigate("/")}>
        <img alt="Logo" src={Logo} />
        <div>WOOWA SHOP</div>
      </S.HeaderTitle>
      <S.HeaderMenu>
        <div onClick={() => navigate("/cart")}>장바구니</div>
        <div onClick={() => navigate("/order-list")}>주문목록</div>
      </S.HeaderMenu>
    </S.HeaderWrapper>
  );
}

export default Header;
