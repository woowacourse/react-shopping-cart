import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { ErrorFallback, FooterButton, NavigationBar } from '../../components/common';

export default function ErrorPage() {
  const routeError = useRouteError();
  const error = isRouteErrorResponse(routeError) ? routeError : (routeError as Error);

  const navigate = useNavigate();

  return (
    <>
      <NavigationBar />
      <ErrorFallback error={error} />
      <FooterButton type="button" buttonText="홈으로 돌아가기" onClick={() => navigate('/')} />
    </>
  );
}
