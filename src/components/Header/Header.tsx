import BackArrow from "../Icon/BackArrow";
import * as S from "./Header.styled";

function Header({
  isOrderComplete,
  setIsOrderComplete,
}: {
  isOrderComplete: boolean;
  setIsOrderComplete: (value: boolean) => void;
}) {
  return (
    <S.HeaderContainer>
      <S.HeaderTitle>
        {isOrderComplete ? (
          <S.HeaderIcon onClick={() => setIsOrderComplete(false)}>
            <BackArrow />
          </S.HeaderIcon>
        ) : (
          "SHOP"
        )}
      </S.HeaderTitle>
    </S.HeaderContainer>
  );
}

export default Header;
