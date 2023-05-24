import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import SvgSprite from './components/@common/Svg/SvgSprite';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import { RouterProvider } from 'react-router-dom';
import CartRouter from './router';
import ToastPortal from './components/@common/Toast/ToastPortal';
import { Suspense } from 'react';
import Spinner from './components/@common/Spinner';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Suspense fallback={<Spinner />}>
          <ToastPortal />
          <RouterProvider router={CartRouter} />
          <SvgSprite />
        </Suspense>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
