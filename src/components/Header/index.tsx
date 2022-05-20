import { useNavigate } from "react-router-dom";

import * as S from "./styles";

import Logo from "../../assets/Logo.png";
import { ROUTE_URL } from "../../constants/constants";

function Header() {
  const navigate = useNavigate();

  return (
    <S.HeaderWrapper>
      <S.HeaderTitle onClick={() => navigate(ROUTE_URL.ROOT)}>
        <img alt="Logo" src={Logo} />
        <div>WOOWA SHOP</div>
      </S.HeaderTitle>
      <S.HeaderMenu>
        <div onClick={() => navigate(ROUTE_URL.PRODUCT_LIST)}>장바구니</div>
        <div onClick={() => navigate(ROUTE_URL.ORDER_LIST)}>주문목록</div>
      </S.HeaderMenu>
    </S.HeaderWrapper>
  );
}

export default Header;
