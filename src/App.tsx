import router from '@routes/route';
import GlobalStyle from '@styles/globalStyle';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Suspense fallback="loading...">
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
