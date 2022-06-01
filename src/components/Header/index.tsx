import { Link, NavLink } from "react-router-dom";
import * as S from "./index.styles";
import ShoppingCartIcon from "../@shared/ShoppingCartIcon";
import { useTheme } from "@emotion/react";
import PATH from "../../constants/path";
import { themeType } from "../../ThemeProvider";

const Header = () => {
  const {
    color: { primary, white },
  } = useTheme() as themeType;

  return (
    <S.Header color={white} backgroundColor={primary}>
      <Link to="/">
        <div>
          <S.LogoContainer>
            <ShoppingCartIcon width="50px" height="50px" fill={white} />
          </S.LogoContainer>
          <S.HomeTitle>LOKBA MARKET</S.HomeTitle>
        </div>
      </Link>
      <S.NavContainer>
        <NavLink to={PATH.SHOPPING_CART}>장바구니</NavLink>
        <NavLink to={PATH.SHOPPING_LIST}>주문목록</NavLink>
      </S.NavContainer>
    </S.Header>
  );
};

export default Header;
