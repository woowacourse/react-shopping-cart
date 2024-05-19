import { LoadingSpinner } from '@components/common';
import router from '@routes/route';
import GlobalStyle from '@styles/globalStyle';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Suspense fallback={<LoadingSpinner $width="100vw" $height="100vh" />}>
        <RouterProvider router={router} />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
