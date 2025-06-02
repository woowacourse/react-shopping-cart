import backButtonImage from '/assets/backButton.svg';
import * as S from './Header.styles';
import { useNavigate } from 'react-router';

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
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <S.HeaderContainer>
      {showBackButton && (
        <S.BackButton onClick={onBackButtonClick ?? goBack}>
          <img src={backButtonImage} />
        </S.BackButton>
      )}

      <S.HeaderTitle>{title}</S.HeaderTitle>
    </S.HeaderContainer>
  );
}

export default Header;
