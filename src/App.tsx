import { Global, css } from '@emotion/react';

import Router from './Router.tsx';
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
      <Router />
    </>
  );
}

export default App;
