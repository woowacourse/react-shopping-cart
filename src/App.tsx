import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global-style';
import Theme from './styles/theme';

import { Error, Loading } from './components';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <RecoilRoot>
        <ErrorBoundary fallback={<Error></Error>}>
          <Suspense fallback={<Loading></Loading>}>
            <RouterProvider router={router} />
          </Suspense>
        </ErrorBoundary>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
