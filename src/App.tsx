import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import SvgSprite from './components/@common/Svg/SvgSprite';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import { RouterProvider } from 'react-router-dom';
import CartRouter from './router';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={CartRouter} />
        <SvgSprite />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
  