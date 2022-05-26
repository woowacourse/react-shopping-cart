import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components';

import theme from 'style/theme';
import GlobalStyle from 'style/GlobalStyle';

import { store } from 'App';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal');
document.body.append(modalRoot);

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {Story()}
          <div id="modal"></div>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  ),
];
