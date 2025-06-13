// components/Header/Header.tsx
import BackArrow from "../Icon/BackArrow";
import * as S from "./Header.styled";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

function Header({
  title = "SHOP",
  showBackButton = false,
  onBackClick,
}: HeaderProps) {
  return (
    <S.HeaderContainer>
      <S.HeaderTitle>
        {showBackButton ? (
          <S.HeaderIcon onClick={onBackClick}>
            <BackArrow />
          </S.HeaderIcon>
        ) : (
          title
        )}
      </S.HeaderTitle>
    </S.HeaderContainer>
  );
}

export default Header;
