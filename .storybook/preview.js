import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from 'styles/globalStyles';

import rootReducer from 'modules';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setProductList } from 'modules/productList';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

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

const loadProductList = () => {
  fetch(`${process.env.REACT_APP_BASE_URL}/productList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((res) => store.dispatch(setProductList(res)));
};

loadProductList();

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
