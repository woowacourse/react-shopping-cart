import { Global, css } from '@emotion/react';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback.tsx';
import Router from './Router.tsx';
import { Suspense } from 'react';
import emotionNormalize from 'emotion-normalize';

const baseStyle = css`
  ${emotionNormalize};
  body {
    width: 430px;
    height: 100vh;
    margin: auto;
  }
`;

function App() {
  return (
    <>
      <Global styles={baseStyle} />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <Router />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
