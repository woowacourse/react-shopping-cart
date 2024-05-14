import { Global, css } from '@emotion/react';

import Router from './Router.tsx';
import emotionNormalize from 'emotion-normalize';

const baseStyle = css`
  ${emotionNormalize};
  body {
    width: 430px;
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
