import { NavLink } from "react-router-dom";
import * as S from "./index.styles";
import ShoppingCartIcon from "../ShoppingCartIcon";

const Header = () => {
  return (
    <S.Header>
      <NavLink to="/">
        <div>
          <S.LogoContainer>
            <ShoppingCartIcon width="50px" height="50px" fill="white" />
          </S.LogoContainer>
          <S.HomeTitle>KKOJAE MARKET</S.HomeTitle>
        </div>
      </NavLink>
      <S.NavContainer>
        <NavLink to="/shopping-cart">장바구니</NavLink>
        <NavLink to="/shopping-list">주문목록</NavLink>
      </S.NavContainer>
    </S.Header>
  );
};

export default Header;
