import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/globalStyles';
import theme from 'styles/theme';

import rootReducer from 'store';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const store = createStore(rootReducer, composeWithDevTools());

export const decorators = [
  (Story) => (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <GlobalStyles />
          <Story />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  ),
];
