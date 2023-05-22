import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import GlobalStyle from './GlobalStyle';

import router from './router';

function App() {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </>
  );
}

export default App;
