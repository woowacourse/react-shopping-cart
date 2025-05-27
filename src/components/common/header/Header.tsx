import backButtonImage from '/assets/backButton.svg';
import * as S from './Header.styles';

interface HeaderProps {
  title?: string;
  showBackButton: boolean;
}

function Header({ title = '', showBackButton }: HeaderProps) {
  return (
    <S.HeaderContainer>
      {showBackButton && (
        <S.BackButton>
          <img src={backButtonImage} />
        </S.BackButton>
      )}

      <S.HeaderTitle>{title}</S.HeaderTitle>
    </S.HeaderContainer>
  );
}

export default Header;
