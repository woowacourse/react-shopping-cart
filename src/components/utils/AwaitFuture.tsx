import { Suspense } from 'react';
import type Future from '../../utils/Future';
import ErrorBoundary from './ErrorBoundary';

type AwaitFutureLoaderProps<TData> = {
  future: Future<TData>;
  children: (data: TData) => React.ReactElement;
};

const AwaitFutureLoader = <TData,>(props: AwaitFutureLoaderProps<TData>) => {
  const { future, children } = props;
  const data = future.unwrap();

  return children(data);
};

type AwaitFutureProps<TData> = {
  future: Future<TData>;
  loadingElement?: React.ReactNode;
  errorElement?: React.ReactNode;
  children: (data: TData) => React.ReactElement;
};

const AwaitFuture = <TData,>(props: AwaitFutureProps<TData>) => {
  const { future, loadingElement, errorElement, children } = props;

  return (
    <ErrorBoundary fallback={errorElement}>
      <Suspense fallback={loadingElement}>
        <AwaitFutureLoader future={future}>{children}</AwaitFutureLoader>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AwaitFuture;
