import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global-style';
import Theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <RecoilRoot>
        <ErrorBoundary fallback={<div>에러가 발생했어요</div>}>
          <Suspense fallback={<div>로딩 중...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </ErrorBoundary>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
