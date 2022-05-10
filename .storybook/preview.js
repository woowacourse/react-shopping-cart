import { GlobalStyle } from '../src/styles/GlobalStyles';
import Theme from '../src/styles/Theme';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

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
  Story => (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <ThemeProvider theme={Theme}>
          <Story />
        </ThemeProvider>
      </BrowserRouter>
    </>
  ),
];
