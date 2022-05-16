import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from 'styles/globalStyles';

import rootReducer from 'modules';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setProductList } from 'modules/productList';

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
  fetch('http://localhost:8080/productList', {
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
      <Provider store={store}>
        <GlobalStyles />
        <Story />
      </Provider>
    </BrowserRouter>
  ),
];
