import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

const CommonLayout = () => (
  <ErrorBoundary fallback={<div>에러</div>}>
    <Suspense fallback={<div>로딩중!</div>}>
      <Outlet />
    </Suspense>
  </ErrorBoundary>
);

export default CommonLayout;
