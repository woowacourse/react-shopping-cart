import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import ErrorPage from '@/pages/ErrorPage';
import LoadingPage from '@/pages/LoadingPage';

export default function GeneralLayout() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}
