import { AppLayoutContainer } from '@components/layout/AppLayout/AppLayout.styled';
import { useRouteError } from 'react-router-dom';

import * as Styled from './ErrorPage.styled';

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
  data?: any;
}

const ErrorPage = () => {
  const error = useRouteError() as RouteError;

  return (
    <AppLayoutContainer>
      <Styled.ErrorPageContents>
        <Styled.ErrorPageHeader>⚠️ 오류</Styled.ErrorPageHeader>
        <Styled.ErrorPageText>오류가 발생했어요.😥</Styled.ErrorPageText>
        <Styled.ErrorPageText>
          <i>오류: {error.statusText || error.message}</i>
        </Styled.ErrorPageText>
      </Styled.ErrorPageContents>
    </AppLayoutContainer>
  );
};

export default ErrorPage;
