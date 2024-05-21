import { Global, css } from '@emotion/react';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.tsx';
import LoadingFallback from './components/LoadingFallback.tsx';
import Router from './Router.tsx';
import { Suspense } from 'react';
import emotionNormalize from 'emotion-normalize';
import { theme } from '@/style/theme.style.ts';

const baseStyle = css`
  ${emotionNormalize};
  body {
    width: 430px;
    height: 100vh;
    margin: auto;
    border-right: 1px solid ${theme.color.grey};
    border-left: 1px solid ${theme.color.grey};
  }
`;

function App() {
  return (
    <>
      <Global styles={baseStyle} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          <Router />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
