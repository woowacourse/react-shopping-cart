import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../style/theme';
import GlobalStyle from '../style/globalStyle';
import { BrowserRouter } from 'react-router-dom';

function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          {children}
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default Providers;
