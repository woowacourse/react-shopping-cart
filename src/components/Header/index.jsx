import { Link } from "react-router-dom";
import * as S from "./index.styles";
import ShoppingCartIcon from "../ShoppingCartIcon";
import { useTheme } from "@emotion/react";

const Header = () => {
  const {
    color: { primary, white },
  } = useTheme();

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
        <Link to="/shopping-cart">장바구니</Link>
        <Link to="/shopping-list">주문목록</Link>
      </S.NavContainer>
    </S.Header>
  );
};

export default Header;
