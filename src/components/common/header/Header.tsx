import backButtonImage from '/assets/backButton.svg';
import * as S from './Header.styles';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
}

function Header({
  title = '',
  showBackButton = false,
  onBackButtonClick,
}: HeaderProps) {
  return (
    <S.HeaderContainer>
      {showBackButton && (
        <S.BackButton onClick={onBackButtonClick}>
          <img src={backButtonImage} />
        </S.BackButton>
      )}

      <S.HeaderTitle>{title}</S.HeaderTitle>
    </S.HeaderContainer>
  );
}

export default Header;
