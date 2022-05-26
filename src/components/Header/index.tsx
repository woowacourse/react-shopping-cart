import { useNavigate } from "react-router-dom";

import { ROUTE_URL } from "constants/constants";

import * as S from "./styles";

import Logo from "assets/Logo.png";

function Header() {
  const navigate = useNavigate();

  return (
    <S.HeaderWrapper>
      <S.HeaderTitle onClick={() => navigate(ROUTE_URL.ROOT)}>
        <S.HeaderLogo alt="Logo" src={Logo} />
        <S.HeaderText>WOOWA SHOP</S.HeaderText>
      </S.HeaderTitle>
      <S.HeaderMenu>
        <S.HeaderText onClick={() => navigate(ROUTE_URL.CART)}>장바구니</S.HeaderText>
        <S.HeaderText onClick={() => navigate(ROUTE_URL.ORDER_LIST)}>주문목록</S.HeaderText>
      </S.HeaderMenu>
    </S.HeaderWrapper>
  );
}

export default Header;
