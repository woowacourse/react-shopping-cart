import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
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
  (Story) => [
    <BrowserRouter>
      <Provider store={store}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Story />
          </ThemeProvider>
      </Provider>
    </BrowserRouter>,
  ],
];
