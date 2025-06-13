import { useNavigate } from 'react-router';
import * as S from './Header.styles';
import backButtonImage from '/assets/backButton.svg';

interface HeaderWithBackButtonProps {
  title?: string;
  showBackButton: true;
  onBackButtonClick?: () => void;
}

interface HeaderWithoutBackButtonProps {
  title?: string;
  showBackButton?: false;
  onBackButtonClick?: never;
}

type HeaderProps = HeaderWithBackButtonProps | HeaderWithoutBackButtonProps;

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
          <img src={backButtonImage} alt="뒤로가기 버튼" />
        </S.BackButton>
      )}

      <S.HeaderTitle>{title}</S.HeaderTitle>
    </S.HeaderContainer>
  );
}

export default Header;
