import React, { PropsWithChildren, ReactElement, Suspense } from 'react';
import ErrorBoundary, {
  ErrorBoundaryProps,
} from '../common/ErrorBoundary/ErrorBoundary';

interface AsyncBoundaryProps extends ErrorBoundaryProps {
  loadingFallback?: ReactElement | null;
}

const AsyncBoundary: React.FC<PropsWithChildren<AsyncBoundaryProps>> = (
  props
) => {
  const {
    children,
    loadingFallback = null,
    errorFallback = null,
    page = false,
  } = props;

  return (
    <ErrorBoundary errorFallback={errorFallback} page={page}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
