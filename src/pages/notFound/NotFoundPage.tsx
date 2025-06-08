import { ROUTE } from '@/shared';
import { useNavigate } from 'react-router';
import * as S from './NotFoundPage.styles';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTE.home);
  };

  return (
    <S.Container>
      <S.Title>Page Not Found</S.Title>
      <S.HomeButton onClick={handleGoHome}>메인 페이지로</S.HomeButton>
    </S.Container>
  );
}

export default NotFoundPage;
