import ErrorPage from '@pages/ErrorPage/ErrorPage';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

const CommonLayout = () => (
  <ErrorBoundary FallbackComponent={({ error }) => <ErrorPage errorMessage={error.message} />}>
    <Suspense fallback={<div>로딩중!</div>}>
      <Outlet />
    </Suspense>
  </ErrorBoundary>
);

export default CommonLayout;
