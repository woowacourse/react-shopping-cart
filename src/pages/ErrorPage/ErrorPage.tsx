import { BasicButton, ErrorFallback } from '@components/common';
import { AppLayoutContainer } from '@components/layout/AppLayout/AppLayout.styled';
import { useNavigate, useRouteError } from 'react-router-dom';

import * as Styled from './ErrorPage.styled';

interface RouteError {
  status: number;
  statusText: string;
  internal: boolean;
  data?: {
    message?: string;
  };
}

const ErrorPage = () => {
  const routeError = useRouteError();
  const navigate = useNavigate();
  const error = routeError instanceof Error ? routeError : new Error((routeError as RouteError).statusText);

  const handleClickHomeButton = () => {
    navigate('/');
  };

  return (
    <AppLayoutContainer>
      <Styled.ErrorPageInner>
        <ErrorFallback error={error} $height="20vh" />
        <BasicButton onClick={handleClickHomeButton}>홈으로 돌아가기</BasicButton>
      </Styled.ErrorPageInner>
    </AppLayoutContainer>
  );
};

export default ErrorPage;
