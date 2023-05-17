import { Suspense } from 'react';
import type Future from '../utils/Future';
import ErrorBoundary from './ErrorBoundary';

type FutureLoaderProps<TData> = {
  future: Future<TData>;
  children: (data: TData) => React.ReactElement;
};

const FutureLoader = <TData,>(props: FutureLoaderProps<TData>) => {
  const { future, children } = props;
  const data = future.unwrap();

  return children(data);
};

type FutureSuspenseProps<TData> = {
  future: Future<TData>;
  loadingElement?: React.ReactNode;
  errorElement?: React.ReactNode;
  children: (data: TData) => React.ReactElement;
};

const FutureSuspense = <TData,>(props: FutureSuspenseProps<TData>) => {
  const { future, loadingElement, errorElement, children } = props;

  return (
    <ErrorBoundary fallback={errorElement}>
      <Suspense fallback={loadingElement}>
        <FutureLoader future={future}>{children}</FutureLoader>
      </Suspense>
    </ErrorBoundary>
  );
};

export default FutureSuspense;
