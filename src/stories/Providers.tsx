import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../style/theme';
import GlobalStyle from '../style/globalStyle';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

function Providers({ children }: { children: ReactNode }) {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default Providers;
