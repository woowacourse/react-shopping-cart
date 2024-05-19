import { ErrorFallback } from '@components/common';
import { AppLayoutContainer } from '@components/layout/AppLayout/AppLayout.styled';
import { useNavigate, useRouteError } from 'react-router-dom';

import * as Styled from './ErrorPage.styled';

interface RouteError {
  status: number;
  statusText: string;
  internal: boolean;
}

const ErrorPage = () => {
  const routeError = useRouteError() as RouteError;
  const navigate = useNavigate();
  const error = new Error(routeError.statusText);

  const handleClickHomeButton = () => {
    navigate('/');
  };

  return (
    <AppLayoutContainer>
      <Styled.ErrorPageInner>
        <ErrorFallback error={error} $height="20vh" />
        <Styled.HomeButton onClick={handleClickHomeButton}>홈으로 돌아가기</Styled.HomeButton>
      </Styled.ErrorPageInner>
    </AppLayoutContainer>
  );
};

export default ErrorPage;
