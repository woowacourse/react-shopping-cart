import { ErrorFallback } from '@components/common';
import { AppLayoutContainer } from '@components/layout/AppLayout/AppLayout.styled';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError() as Error;

  return (
    <AppLayoutContainer>
      <ErrorFallback error={error} $height="100vh" />
    </AppLayoutContainer>
  );
};

export default ErrorPage;
