import { Link } from "react-router-dom";
import * as S from "./index.styles";
import { ReactComponent as Logo } from "../../assets/image/cart.svg";

const Header = () => {
  return (
    <S.Header>
      <Link to="/">
        <div>
          <S.LogoContainer>
            <Logo width="50px" height="50px" fill="white" />
          </S.LogoContainer>
          <S.HomeTitle>WOOWA SHOP</S.HomeTitle>
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
