import { css } from '@emotion/react';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import LoadingPage from './pages/LoadingPage';
import { router } from './router';

function App() {
  return (
    <div css={container}>
      <div css={wrapper}>
        <Suspense fallback={<LoadingPage />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;

const container = css`
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const wrapper = css`
  height: 100vh;

  display: flex;
  flex-direction: column;
  width: 430px;

  border-left: 1px solid black;
  border-right: 1px solid black;
`;
