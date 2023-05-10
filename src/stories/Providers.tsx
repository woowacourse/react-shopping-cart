import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../style/theme';
import GlobalStyle from '../style/globalStyle';

function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </>
  );
}

export default Providers;
