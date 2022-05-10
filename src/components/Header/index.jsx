import { Link } from "react-router-dom";
import * as S from "./index.styles";

const Header = () => {
  return (
    <S.Header>
      <Link to="/">
        <div>
          <S.Image
            src={process.env.PUBLIC_URL + "/assets/images/cart.svg"}
            alt={"로고이미지"}
          />
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
