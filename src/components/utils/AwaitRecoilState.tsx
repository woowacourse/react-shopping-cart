import { Suspense } from 'react';
import type { RecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import ErrorBoundary from './ErrorBoundary';

type AwaitRecoilStateLoaderProps<T> = {
  state: RecoilState<T>;
  children: (data: T) => React.ReactElement;
};

const AwaitRecoilStateLoader = <T,>(props: AwaitRecoilStateLoaderProps<T>) => {
  const { state, children } = props;
  const unwrapedState = useRecoilValue(state);

  return children(unwrapedState);
};

type AwaitRecoilStateProps<T> = {
  loadingElement?: React.ReactNode;
  errorElement?: React.ReactNode;
  state: RecoilState<T>;
  children: (data: T) => React.ReactElement;
};

const AwaitRecoilState = <T,>(props: AwaitRecoilStateProps<T>) => {
  const { errorElement, loadingElement, state, children } = props;

  return (
    <ErrorBoundary fallback={errorElement}>
      <Suspense fallback={loadingElement}>
        <AwaitRecoilStateLoader state={state}>{children}</AwaitRecoilStateLoader>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AwaitRecoilState;
