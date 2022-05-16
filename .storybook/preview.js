import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import theme from 'style/theme';
import GlobalStyle from 'style/GlobalStyle';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {Story()}
      </ThemeProvider>
    </BrowserRouter>
  ),
];
