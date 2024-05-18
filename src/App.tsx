import { css } from '@emotion/react';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';

function App() {
  return (
    <div css={container}>
      <div css={wrapper}>
        <RouterProvider router={router} />
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
