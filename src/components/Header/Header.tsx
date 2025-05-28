import BackArrow from "../Icon/BackArrow";
import * as S from "./Header.styled";

function Header({ isCartComplete }: { isCartComplete?: boolean }) {
  return (
    <S.HeaderContainer>
      <S.HeaderTitle>{isCartComplete ? <BackArrow /> : "SHOP"}</S.HeaderTitle>
    </S.HeaderContainer>
  );
}

export default Header;
